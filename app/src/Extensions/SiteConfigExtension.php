<?php

namespace App\Extensions;

use A2nt\SilverStripeMapboxField\MapboxField;
use Innoweb\Sitemap\Pages\SitemapPage;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Blog\Model\BlogPost;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\DataExtension;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TreeMultiselectField;
use SilverStripe\Forms\DropdownField;

//use BetterBrief\GoogleMapField;

class SiteConfigExtension extends DataExtension
{
    private static $db = [
        'ExtraCode' => 'Text',
        'Longitude' => 'Decimal(10, 8)',
        'Latitude' => 'Decimal(11, 8)',
        'MapZoom' => 'Int',
        //'MapAPIKey' => 'Varchar(255)',
        'Description' => 'Varchar(255)',
        'Address' => 'Varchar(255)',
        'Suburb' => 'Varchar(255)',
        'State' => 'Varchar(255)',
        'ZipCode' => 'Varchar(6)',
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
        $img = Image::get()->filter([
            'ParentID' => 0,
            'FileFilename' => 'qrcode.png',
        ])->first();
        if ($img) {
            $fields->addFieldsToTab('Root.Main', [
                LiteralField::create('QRCode', '<img src="'.$img->Link().'" alt="QR code" width="200" style="float:left" />'),
            ]);
        }

        $fields->addFieldsToTab('Root.Main', [
            TreeMultiselectField::create(
                'Navigation',
                'Navigation',
                SiteTree::class
            )->setDisableFunction(static function ($el) {
                return $el->getField('ParentID') !== 0;
            }),
            TextareaField::create('Description', 'Website Description'),
            TextareaField::create('ExtraCode', 'Extra site-wide HTML code'),
            DropdownField::create(
                'PrivacyPolicyID',
                'Privacy Policy Page',
                SiteTree::get()->map()->toArray()
            )->setEmptyString('(Select one)'),
            DropdownField::create(
                'SitemapID',
                'Sitemap Page',
                SitemapPage::get()->map()->toArray()
            )->setEmptyString('(Select one)'),
        ]);

        $mapTab = $fields->findOrMakeTab('Root.Maps');
        $mapTab->setTitle('Address / Map');

        $fields->addFieldsToTab('Root.Maps', [
            TextField::create('Address'),
            TextField::create('Suburb', 'City'),
            TextField::create('State'),
            TextField::create('ZipCode'),
        ]);

        if (MapboxField::getAccessToken()) {
            $fields->addFieldsToTab('Root.Maps', [
                //TextField::create('MapAPIKey'),
                TextField::create('MapZoom'),
                MapboxField::create('Map', 'Choose a location', 'Latitude', 'Longitude'),
            ]);
        } else {
            $fields->addFieldsToTab('Root.Maps', [
                LiteralField::create('MapNotice', '<p class="alert alert-info">No Map API keys specified.</p>')
            ]);
        }

        /*GoogleMapField::create(
            $this->owner,
            'Location',
            [
                'show_search_box' => true,
            ]
        )*/
    }

    public function MapAPIKey()
    {
        return MapboxField::config()->get('access_token');
    }

    public function MapStyle()
    {
        return MapboxField::config()->get('map_style');
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

    public function getLatestBlogPosts()
    {
        return BlogPost::get()->sort('PublishDate DESC');
    }
}
