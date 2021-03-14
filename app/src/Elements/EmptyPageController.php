<?php


namespace App\Elements;


use SilverStripe\SiteConfig\SiteConfig;

class EmptyPageController extends \PageController
{
    public function __construct($dataRecord = null)
    {
        parent::__construct();
        $this->dataRecord->Title = SiteConfig::current_site_config()->getField('Title');

        $this->setFailover($this->dataRecord);
    }

    public static function DefaultContainer()
    {
        return \Page::DefaultContainer();
    }
}
