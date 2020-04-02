<?php
/** @noinspection PhpUnusedPrivateFieldInspection */

/**
 * Directs assets requests to Webpack server or to static files
 */

namespace Site\Templates;

use A2nt\ProgressiveWebApp\Controllers\ServiceWorkerController;
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
    public static function get_template_global_variables(): array
    {
        return [
            'WebpackDevServer' => 'isActive',
            'WebpackCSS' => 'loadCSS',
            'WebpackJS' => 'loadJS',
            'ResourcesURL' => 'resourcesURL',
            'ProjectName' => 'themeName',
            'SWVersion' => 'swVersion'
        ];
    }

    /**
     * Load CSS file
     * @param $path
     */
    public static function loadCSS($path): void
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
    public static function loadJS($path): void
    {
        Requirements::javascript(self::_getPath($path));
    }

    public static function projectName(): string
    {
        return Config::inst()->get(ModuleManifest::class, 'project');
    }

    public static function mainTheme()
    {
        $themes = Config::inst()->get(SSViewer::class, 'themes');
        return is_array($themes) && $themes[0] !== '$public' && $themes[0] !== '$default' ? $themes[0] : false;
    }

    public static function resourcesURL($link = null): string
    {
        return Controller::join_links(Director::baseURL(), '/resources/'.self::projectName().'/client/dist/img/', $link);
    }


    /**
     * Checks if dev mode is enabled and if webpack server is online
     * @return bool
     */
    public static function isActive(): bool
    {
        $cfg = self::config();
        return Director::isDev() && @fsockopen(
            $cfg['HOSTNAME'],
            $cfg['PORT']
        );
    }

    protected static function _getPath($path): string
    {
        return self::isActive() && strpos($path, '//') === false ?
            self::_toDevServerPath($path) :
            self::_toPublicPath($path);
    }

    protected static function _toDevServerPath($path): string
    {
        $cfg = self::config();
        return sprintf(
            '%s%s:%s/%s',
            Director::protocol(),
            $cfg['HOSTNAME'],
            $cfg['PORT'],
            basename($path)
        );
    }

    protected static function _toPublicPath($path): string
    {
        $cfg = self::config();
        return strpos($path, '//') === false ?
            Controller::join_links(
                self::projectName(),
                $cfg['DIST'],
                (strpos($path, '.css') ? 'css' : 'js'),
                $path
            )
            : $path;
    }

    public static function config(): array
    {
        return Config::inst()->get(__CLASS__);
    }

    public static function swVersion()
    {
        if(class_exists(ServiceWorkerController::class)) {
            return ServiceWorkerController::Version();
        }
    }
}
