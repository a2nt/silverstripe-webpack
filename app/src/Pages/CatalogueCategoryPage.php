<?php

namespace Site\Pages;

use Page;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;

class CatalogueCategoryPage extends Page
{
	private static $table_name = 'CatalogueCategoryPage';
    private static $icon_class = 'fas fa-th-large';
    private static $can_be_root = false;
    private static $allowed_children = [
    	CatalogueItemPage::class,
    ];

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
