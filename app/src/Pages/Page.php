<?php

// vendor/silverstripe/errorpage/src/ErrorPage.php
// extends global Page class
//namespace App\Pages;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\FontAwesome\FontAwesomeField;

/**
 * Class \Page
 *
 * @property bool $InheritSideBar
 * @property string $BlockIcon
 * @property int $SideBarID
 * @property int $ElementalAreaID
 * @method \SilverStripe\Widgets\Model\WidgetArea SideBar()
 * @method \DNADesign\Elemental\Models\ElementalArea ElementalArea()
 * @mixin \DNADesign\Elemental\Extensions\ElementalPageExtension
 * @mixin \A2nt\CMSNiceties\Widgets\WidgetPageExtension
 * @mixin \A2nt\CMSNiceties\GraphQL\ObjectGraphQlEx
 * @mixin \Sheadawson\Linkable\Extensions\LinkableDataExtension
 */
class Page extends SiteTree
{
    private static $mailchimp_list_id = '0c122fd88f';
    private static $mailchimp_key = 'e2c03357299701a82275d6de9c8f2551-us8';

    private static $db = [
        'BlockIcon' => 'Varchar(255)',
    ];

    private static $field_include = [
        'ElementalAreaID',
    ];

    public function getSettingsFields()
    {
        $fields = parent::getSettingsFields();

        $fields->addFieldsToTab('Root.Icon', [
            FontAwesomeField::create('BlockIcon', 'Page link Icon'),
        ]);

        return $fields;
    }
}
