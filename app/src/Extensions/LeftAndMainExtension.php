<?php


namespace Site\Extensions;

use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Extension;
use SilverStripe\FontAwesome\FontAwesomeField;
use SilverStripe\View\Requirements;
use Site\Templates\DeferredRequirements;

class LeftAndMainExtension extends Extension
{
    public function init()
    {
        $config = Config::inst()->get(DeferredRequirements::class);
        // App libs
        if (!$config['nofontawesome']) {
            $v = !isset($config['fontawesome_version']) || !$config['fontawesome_version']
                ? Config::inst()->get(FontAwesomeField::class, 'version')
                : $config['fontawesome_version'];

            Requirements::css('//use.fontawesome.com/releases/v'.$v.'/css/all.css');
        }
    }
}
