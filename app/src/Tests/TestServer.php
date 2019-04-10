<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 10/31/18
 * Time: 5:31 AM
 */

namespace Site\Tests;

use SilverStripe\Assets\Upload_Validator;
use SilverStripe\Core\Cache\FilesystemCacheFactory;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Convert;
use SilverStripe\Dev\BuildTask;
use SilverStripe\Assets\File;

class TestServer extends BuildTask
{
    protected $title = 'Test server';
    protected $description = 'Test server';

    public function run($request)
    {
        echo '<style>table{width:100%}table td,table th{border:1px solid #dedede}</style>';

        echo '<h2>Testing Uploads</h2>';
        $maxUpload = ini_get('upload_max_filesize');
        $maxPost = ini_get('post_max_size');

        echo self::success('PHP max upload size: '.$maxUpload);
        echo self::success('PHP max post size: '.$maxPost);
        echo self::success('So calculated max upload size: '.self::formatBytes(min(
            Convert::memstring2bytes($maxUpload),
            Convert::memstring2bytes($maxPost)
        )));

        $defaultSizes = Config::inst()->get(Upload_Validator::class, 'default_max_file_size');
        if($defaultSizes) {
            if(!is_array($defaultSizes)){
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
}
