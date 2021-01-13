<?php

namespace Site\Pages;

use Page;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;

class CatalogueItemPage extends Page
{
	private static $table_name = 'CatalogueItemPage';
    private static $icon_class = 'fas fa-box';
    private static $allowed_children = [];
    private static $can_be_root = false;

    private static $has_one = [
        'Icon' => Image::class,
    ];

    public function getCMSFields()
    {
	    $fields = parent::getCMSFields();

	    $fields->addFieldsToTab('Root.Main', [
	    	UploadField::create('Icon')
	    ]);

	    return $fields;
    }
}
