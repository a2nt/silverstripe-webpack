<?php

use SilverStripe\ORM\DataExtension;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TreeMultiselectField;
use Sheadawson\Linkable\Models\Link;
use SilverStripe\Forms\TextField;
use Sheadawson\Linkable\Forms\LinkField;

class SiteConfigExtension extends DataExtension
{
    private static $db = [
        'Address' => 'Varchar(255)',
    ];

    private static $has_one = [
        'PhoneNumber' => Link::class
    ];

    private static $many_many = [
        'Navigation' => SiteTree::class
    ];

    public function updateCMSFields(FieldList $fields)
    {
        $tab = $fields->findOrMakeTab('Root.Main');

        $tab->push(TreeMultiselectField::create(
            'Navigation',
            'Navigation',
            SiteTree::class
        ));
        $tab->push(
            LinkField::create('PhoneNumberID', 'Phone Number')
                ->setAllowedTypes(['Phone'])
        );
        $tab->push(TextField::create('Address'));
    }
}
