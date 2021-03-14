<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 10/31/18
 * Time: 5:31 AM
 */

namespace App\Tests;

use SilverStripe\Assets\Upload_Validator;
use SilverStripe\Core\Cache\FilesystemCacheFactory;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Convert;
use SilverStripe\Dev\BuildTask;
use SilverStripe\Dev\Deprecation;
use SilverStripe\Assets\File;

class TestServer extends BuildTask
{
    protected $title = 'Test server';
    protected $description = 'Test server';

    public function run($request)
    {
        echo '<style>table{width:100%}table td,table th{border:1px solid #dedede}</style>';

        echo '<h2>Testing Server</h2>';
        echo self::success('BASE_PATH: <b>'.BASE_PATH.'</b>');
        echo self::success('PHP: <b>'.phpversion().'</b>');

        $v = Deprecation::dump_settings()['version'];
        if ($v) {
            echo self::success('SilverStipe version: <b>'.$v.'</b>');
        } else {
            echo self::success('SilverStipe version unknown: <b>'
                .(file_exists(BASE_PATH.'/framework') ? '3.x.x' : '4.x.x')
            .'</b>');
        }

        echo self::success('Memory limit: <b>'.ini_get('memory_limit').'</b>');


        if (is_writable(TEMP_FOLDER)) {
            echo self::success('TMP (cache) dir <b>'.TEMP_FOLDER.'</b> dir is writable.');
        } else {
            echo self::error('TMP (cache) dir <b>'.TEMP_FOLDER.'</b> dir is no writable!');
        }

        echo '<h2>Testing Uploads</h2>';
        $maxUpload = ini_get('upload_max_filesize');
        $maxPost = ini_get('post_max_size');

        echo self::success('PHP max upload size: '.$maxUpload);
        echo self::success('PHP max post size: '.$maxPost);
        echo self::success('So calculated max upload size: '.self::formatBytes(min(
            self::memstring2bytes($maxUpload),
            self::memstring2bytes($maxPost)
        )));

        $defaultSizes = Config::inst()->get(Upload_Validator::class, 'default_max_file_size');
        if ($defaultSizes) {
            if (!is_array($defaultSizes)) {
                echo self::error('default_max_file_size miss-configuration, plz fix');
                var_dump($defaultSizes);
                die();
            }

            echo '<h3>Configured limits:</h3><table style="text-align:center">'
                .'<thead><tr><th>File</th><th>Size limit</th></tr></thead><tbody>';
            foreach ($defaultSizes as $k => $size) {
                echo '<tr><td>'.$k.'</td><td>'.$size.'</td></tr>';
            }
            echo '</tbody></table>';
        }

        if (is_writable(ASSETS_DIR)) {
            echo self::success('Assets dir <b>'.ASSETS_DIR.'</b> dir is writable.');
        } else {
            echo self::error('Assets dir <b>'.ASSETS_DIR.'</b> dir is no writable!');
        }

        if (function_exists('imagewebp')) {
            echo self::success('WebP is available');
        } else {
            echo self::error('WebP is not available');
        }


        die();
    }


    public static function formatBytes($size, $precision = 2)
    {
        $base = log($size, 1024);
        $suffixes = array('', 'K', 'M', 'G', 'T');

        return round(pow(1024, $base - floor($base)), $precision) . $suffixes[(string)floor($base)];
    }

    public static function error($text)
    {
        return '<span style="color:red">ERROR: '.$text.'</span><br/>';
    }

    public static function success($text)
    {
        return '<span style="color:green">SUCCESS: '.$text.'</span><br/>';
    }

    public static function warning($text)
    {
        return '<span style="color:#0014ff">WARNING: '.$text.'</span><br/>';
    }

    public static function renderValidation($result)
    {
        echo '<p>';
        $msgs = $result->getMessages();
        foreach ($msgs as $msg) {
            echo self::error($msg['fieldName'].': '.$msg['message']);
        }
        echo '</p>';
    }

    public static function memstring2bytes($memString)
    {
        // Remove  non-unit characters from the size
        $unit = preg_replace('/[^bkmgtpezy]/i', '', $memString);
        // Remove non-numeric characters from the size
        $size = preg_replace('/[^0-9\.]/', '', $memString);

        if ($unit) {
            // Find the position of the unit in the ordered string which is the power
            // of magnitude to multiply a kilobyte by
            return round($size * pow(1024, stripos('bkmgtpezy', $unit[0])));
        }

        return round($size);
    }
}
