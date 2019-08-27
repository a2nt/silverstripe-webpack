<?php

namespace Site\Templates;

use SilverStripe\Control\Controller;
use SilverStripe\View\TemplateGlobalProvider;
use SilverStripe\View\Requirements;
use SilverStripe\Core\Config\Config;
use SilverStripe\Control\Director;
use SilverStripe\Core\Path;
use SilverStripe\Core\Manifest\ManifestFileFinder;

class DeferedRequirements implements TemplateGlobalProvider
{
    private static $css = [];
    private static $js = [];
    private static $defered = false;
    private static $static_domain;
    private static $version;
    private static $nojquery = false;
    private static $nofontawesome = false;
    private static $custom_requirements = [];

    /**
     * @return array
     */
    public static function get_template_global_variables()
    {
        return [
            'AutoRequirements' => 'Auto',
            'DeferedCSS' => 'loadCSS',
            'DeferedJS' => 'loadJS',
        ];
    }

    public static function Auto($class = false)
    {
        $config = Config::inst()->get(self::class);
        $projectName = WebpackTemplateProvider::projectName();
        $mainTheme = WebpackTemplateProvider::mainTheme();
        $mainTheme = $mainTheme ? $mainTheme : $projectName;

        $dir = Path::join(
            Director::publicFolder(),
            ManifestFileFinder::RESOURCES_DIR,
            $projectName,
            'client',
            'dist'
        );
        $cssPath = Path::join($dir, 'css');
        $jsPath = Path::join($dir, 'js');

        // Initialization
        Requirements::block(THIRDPARTY_DIR.'/jquery/jquery.js');
        /*if (defined('FONT_AWESOME_DIR')) {
            Requirements::block(FONT_AWESOME_DIR.'/css/lib/font-awesome.min.css');
        }*/
        Requirements::set_force_js_to_bottom(true);

        // Main libs
        if (!$config['nojquery']) {
            DeferedRequirements::loadJS('//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js');
        }
        // App libs
        if (!$config['nofontawesome']) {
            DeferedRequirements::loadCSS('//use.fontawesome.com/releases/v5.4.0/css/all.css');
        }
        DeferedRequirements::loadCSS($mainTheme.'.css');
        DeferedRequirements::loadJS($mainTheme.'.js');

        // Custom controller requirements
        $class = get_class(Controller::curr());
        if (isset($config['custom_requirements'][$class])) {
            foreach ($config['custom_requirements'][$class] as $file) {
                if (strpos($file, '.css')) {
                    DeferedRequirements::loadCSS($file);
                }
                if (strpos($file, '.js')) {
                    DeferedRequirements::loadJS($file);
                }
            }
        }

        $class = str_replace('\\', '.', $class);

        // Controller requirements
        $themePath = Path::join($cssPath, $mainTheme.'_'.$class . '.css');
        $projectPath = Path::join($cssPath, $projectName.'_'.$class . '.css');
        if ($mainTheme && file_exists($themePath)) {
            DeferedRequirements::loadCSS($mainTheme.'_'.$class . '.css');
        } elseif (file_exists($projectPath)) {
            DeferedRequirements::loadCSS($projectName.'_'.$class . '.css');
        }

        $themePath = Path::join($jsPath, $mainTheme.'_'.$class . '.js');
        $projectPath = Path::join($jsPath, $projectName.'_'.$class . '.js');
        if ($mainTheme && file_exists($themePath)) {
            DeferedRequirements::loadJS($mainTheme.'_'.$class . '.js');
        } elseif (file_exists($projectPath)) {
            DeferedRequirements::loadJS($projectName.'_'.$class . '.js');
        }

        return self::forTemplate();
    }

    public static function loadCSS($css)
    {
        $external = (mb_substr($css, 0, 2) === '//' || mb_substr($css, 0, 4) === 'http');
        if ($external || (self::$defered && !self::_webpackActive())) {
            self::$css[] = $css;
        } else {
            WebpackTemplateProvider::loadCSS($css);
        }
    }

    public static function loadJS($js)
    {
        /*$external = (mb_substr($js, 0, 2) === '//' || mb_substr($js, 0, 4) === 'http');
        if ($external || (self::$defered && !self::_webpackActive())) {*/
        // webpack supposed to load external JS
        if (self::$defered && !self::_webpackActive()) {
            self::$js[] = $js;
        } else {
            WebpackTemplateProvider::loadJS($js);
        }
    }

    protected static function _webpackActive()
    {
        return class_exists('WebpackTemplateProvider') && WebpackTemplateProvider::isActive();
    }

    public static function setDefered($bool)
    {
        self::$defered = $bool;
    }

    public static function forTemplate()
    {
        $result = '';
        foreach (self::$css as $css) {
            $result .= '<i class="defer-cs" data-load="' . self::get_url($css) . '"></i>';
        }
        foreach (self::$js as $js) {
            $result .= '<i class="defer-sc" data-load="' . self::get_url($js) . '"></i>';
        }

        $result .=
            '<script type="text/javascript">function lsc(a,b){var c=document.createElement("script");c.type="text/javascript",c.readyState'
            .'?c.onreadystatechange=function(){"loaded"!=c.readyState&&"complete"!=c.readyState||(c.onreadystatechange=null,b())}'
            .':c.onload=function(){b()},c.src=a,document.getElementsByTagName("body")[0].appendChild(c)}'
            .'function lscd(a){a<s.length-1&&(a++,lsc(s.item(a).getAttribute("data-load"),function(){lscd(a)}))}'
            .'for(var s=document.getElementsByClassName("defer-cs"),i=0;i<s.length;i++){var b=document.createElement("link");b.rel="stylesheet",'
            .'b.type="text/css",b.href=s.item(i).getAttribute("data-load"),b.media="all";var c=document.getElementsByTagName("body")[0];'
            .'c.appendChild(b)}var s=document.getElementsByClassName("defer-sc"),i=0;if(s.item(i)!==null)lsc(s.item(i).getAttribute("data-load"),function(){lscd(i)});'
            .'</script>';

        return $result;
    }

    private static function get_url($url)
    {
        $config = Config::inst()->get(self::class);

        // external URL
        if (strpos($url, '//') !== false) {
            return $url;
        }

        $version = $config['version'];
        $version = $version
            ? strpos($url, '?') // inner URL
                ? '&'.$version // add param
                : '?'.$version // new param
            : ''; // no version defined

        $static_domain = $config['static_domain'];
        $static_domain = $static_domain ? $static_domain : '';

        return $url.$version;
    }
}
