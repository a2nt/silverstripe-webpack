<?php

namespace Site\Extensions;

use SilverStripe\Forms\TextareaField;
use SilverStripe\ORM\DataExtension;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TreeMultiselectField;

class SiteConfigExtension extends DataExtension
{
    private static $db = [
        'ShortDescription' => 'Text',
        'ExtraCode' => 'Text',
    ];

    private static $many_many = [
        'Navigation' => SiteTree::class,
        'Services' => SiteTree::class,
        'QuickLinks' => SiteTree::class,
    ];

    public function updateCMSFields(FieldList $fields)
    {
        $tab = $fields->findOrMakeTab('Root.Main');

        $tab->push(TreeMultiselectField::create(
            'Navigation',
            'Navigation',
            SiteTree::class
        ));

        $tab->push(TreeMultiselectField::create(
            'Services',
            'Services',
            SiteTree::class
        ));
        $tab->push(TreeMultiselectField::create(
            'QuickLinks',
            'QuickLinks',
            SiteTree::class
        ));

        $tab->push(TextareaField::create('ShortDescription'));

        $tab->push(TextareaField::create('ExtraCode', 'Extra site-wide HTML code'));
    }
}
