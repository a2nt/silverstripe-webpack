<?php

/**
 * Directs assets requests to Webpack server or to static files
 */

namespace Site\Templates;

use SilverStripe\Core\Manifest\ModuleManifest;
use SilverStripe\View\SSViewer;
use SilverStripe\View\TemplateGlobalProvider;
use SilverStripe\View\Requirements;
use SilverStripe\Control\Director;
use SilverStripe\Control\Controller;
use SilverStripe\Core\Config\Config;

class WebpackTemplateProvider implements TemplateGlobalProvider
{
    /**
     * @var int port number
     */
    private static $port = 3000;

    /**
     * @var string host name
     */
    private static $hostname = 'localhost';

    /**
     * @var string assets static files directory
     */
    private static $dist = 'client/dist';

    /**
     * @return array
     */
    public static function get_template_global_variables()
    {
        return [
            'WebpackDevServer' => 'isActive',
            'WebpackCSS' => 'loadCSS',
            'WebpackJS' => 'loadJS',
            'ResourcesURL' => 'resourcesURL',
            'ProjectName' => 'themeName',
        ];
    }

    /**
     * Load CSS file
     * @param $path
     */
    public static function loadCSS($path)
    {
        if (self::isActive()) {
            return;
        }

        Requirements::css(self::_getPath($path));
    }

    /**
     * Load JS file
     * @param $path
     */
    public static function loadJS($path)
    {
        Requirements::javascript(self::_getPath($path));
    }

    public static function projectName()
    {
        return Config::inst()->get(ModuleManifest::class, 'project');
    }

    public static function mainTheme()
    {
        $themes = Config::inst()->get(SSViewer::class, 'themes');
        return is_array($themes) && $themes[0] !== '$public' && $themes[0] !== '$default' ? $themes[0] : false;
    }

    public static function resourcesURL($link = null)
    {
        return Controller::join_links(Director::baseURL(), '/resources/'.self::projectName().'/client/dist/img/', $link);
    }


    /**
     * Checks if dev mode is enabled and if webpack server is online
     * @return bool
     */
    public static function isActive()
    {
        return Director::isDev() && !!@fsockopen(
            Config::inst()->get(__CLASS__, 'HOSTNAME'),
            Config::inst()->get(__CLASS__, 'PORT')
        );
    }

    protected static function _getPath($path)
    {
        return self::isActive() && strpos($path, '//') === false ?
            self::_toDevServerPath($path) :
            self::_toPublicPath($path);
    }

    protected static function _toDevServerPath($path)
    {
        return sprintf(
            '%s%s:%s/%s',
            Director::protocol(),
            Config::inst()->get(__CLASS__, 'HOSTNAME'),
            Config::inst()->get(__CLASS__, 'PORT'),
            basename($path)
        );
    }

    protected static function _toPublicPath($path)
    {
        return strpos($path, '//') === false ?
            Controller::join_links(
                self::projectName(),
                Config::inst()->get(__CLASS__, 'DIST'),
                (strpos($path, '.css') ? 'css' : 'js'),
                $path
            )
            : $path;
    }
}
