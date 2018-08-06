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
        'ExtraCode' => 'Text',
    ];

    private static $has_one = [
        'PrivacyPolicy' => SiteTree::class,
    ];

    private static $many_many = [
        'Navigation' => SiteTree::class,
    ];

    public function updateCMSFields(FieldList $fields)
    {
        $tab = $fields->findOrMakeTab('Root.Main');

        $tab->push(TreeMultiselectField::create(
            'Navigation',
            'Navigation',
            SiteTree::class
        ));

        $tab->push(TreeDropdownField::create('PrivacyPolicyID', 'Select privacy policy page', SiteTree::class));

        $tab->push(TextareaField::create('ExtraCode', 'Extra site-wide HTML code'));
    }
}
