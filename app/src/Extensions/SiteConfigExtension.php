<?php

namespace Site\Extensions;

use Innoweb\Sitemap\Pages\SitemapPage;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\DataExtension;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TreeMultiselectField;
use BetterBrief\GoogleMapField;

class SiteConfigExtension extends DataExtension
{
    private static $db = [
        'ExtraCode' => 'Text',
        'Longitude' => 'Varchar(255)',
        'Latitude' => 'Varchar(255)',
        'MapZoom' => 'Int',
        'MapAPIKey' => 'Varchar(255)'
    ];

    private static $has_one = [
        'PrivacyPolicy' => SiteTree::class,
        'Sitemap' => SiteTree::class,
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

        $tab->push(TextareaField::create('ExtraCode', 'Extra site-wide HTML code'));

        $tab->push(DropdownField::create(
            'PrivacyPolicyID',
            'Privacy Policy Page',
            SiteTree::get()->map()->toArray()
        ));

        $tab->push(DropdownField::create(
            'SitemapID',
            'Sitemap Page',
            SitemapPage::get()->map()->toArray()
        ));

        $mapTab = $fields->findOrMakeTab('Root.GoogleMaps');
        $mapTab->push(TextField::create('MapAPIKey'));
        $mapTab->push(TextField::create('MapZoom'));
        $mapTab->push(GoogleMapField::create(
            $this->owner,
            'Location'
        ));
    }

    public function getGeoJSON()
    {
        return '{"type": "MarkerCollection","features": [{"type": "Feature","icon": "<i class=\'fas fa-map-marker-alt\'></i>",'
            .'"properties": {"content": "'.$this->owner->getTitle().'"},"geometry": {"type": "Point",'
            .'"coordinates": ['.$this->owner->getField('Longitude').','.$this->owner->getField('Latitude').']}}]}';
    }

    public function DirectionsLink()
    {
        return '<a href="https://www.google.com/maps/dir/Current+Location/'
            .$this->owner->getField('Latitude').','
            .$this->owner->getField('Longitude').'" class="btn btn-primary btn-directions" target="_blank">'
            .'<i class="fas fa-road"></i> Get Directions</a>';
    }
}
