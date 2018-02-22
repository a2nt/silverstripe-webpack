<?php

/**
 * Directs assets requests to Webpack server or to static files
*/

class WebpackTemplateProvider extends Object implements TemplateGlobalProvider
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
    private static $dist = 'site/dist';

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
        $class = __CLASS__;
        return Director::isDev() && !!@fsockopen(
            $class::config()->get('HOSTNAME'),
            $class::config()->get('PORT')
        );
    }

    protected static function _getPath($path)
    {
        return self::isActive() && strpos($path,'//') === false ?
            self::_toDevServerPath($path) :
            self::_toPublicPath($path);
    }

    protected static function _toDevServerPath($path)
    {
        $class = __CLASS__;
        return sprintf(
            '%s%s:%s/%s',
            Director::protocol(),
            $class::config()->get('HOSTNAME'),
            $class::config()->get('PORT'),
            basename($path)
        );
    }

    protected static function _toPublicPath($path)
    {
        $class = __CLASS__;
        return strpos($path,'//') === false ?
            Controller::join_links(
                $class::config()->get('DIST'),
                (strpos($path,'.css') ? 'css' : 'js' ),
                $path
            )
            : $path;
    }
}
