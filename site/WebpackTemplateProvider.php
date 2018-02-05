<?php

/**
 * Directs assets requests to Webpack server or to static files
*/

class WebpackTemplateProvider extends Object implements TemplateGlobalProvider
{
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
    private static $distDir = 'site/dist';

    /**
     * Load CSS file
     * @param $path
     */
    public static function loadCSS($path)
    {
        if (!self::isActive()) {
            Requirements::css(self::_toPublicPath($path));
        }
    }

    /**
     * Load JS file
     * @param $path
     */
    public static function loadJS($path)
    {
        $path = self::isActive() ?
            self::_toDevServerPath($path) :
            self::_toPublicPath($path);

        Requirements::javascript($path);
    }


    /**
     * Checks if dev mode is enabled and if webpack server is online
     * @return bool
     */
    public static function isActive()
    {
        $class = __CLASS__;
        return Director::isDev() && !!@fsockopen(
                $class::config()->get('hostname'),
                $class::config()->get('port')
            );
    }

    protected static function _toDevServerPath($path)
    {
        $class = __CLASS__;
        return sprintf(
            'http://%s:%s/%s',
            $class::config()->get('hostname'),
            $class::config()->get('port'),
            $path
        );
    }

    protected static function _toPublicPath($path)
    {
        $class = __CLASS__;
        return $class::config()->get('distDir') . '/' . $path;
    }
}
