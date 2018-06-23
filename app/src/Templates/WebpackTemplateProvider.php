<?php

/**
 * Directs assets requests to Webpack server or to static files
*/

namespace Site\Templates;

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
    private static $dist = 'app/client/dist';

    /**
     * @return array
     */
    public static function get_template_global_variables()
    {
        return [
            'WebpackDevServer' => 'isActive',
            'WebpackCSS' => 'loadCSS',
            'WebpackJS' => 'loadJS',
        ];
    }

    /**
     * Load CSS file
     * @param $path
     */
    public static function loadCSS($path)
    {
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
                Config::inst()->get(__CLASS__, 'DIST'),
                (strpos($path, '.css') ? 'css' : 'js'),
                $path
            )
            : $path;
    }
}
