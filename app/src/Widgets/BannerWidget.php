<?php


namespace Site\Widgets;

use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Widgets\Model\Widget;
use Site\Extensions\ElementImageWidget;

if (!class_exists(Widget::class)) {
    return;
}

class BannerWidget extends Widget
{
    private static $title = 'Banner';
    private static $cmsTitle = 'Banner';
    private static $description = 'Shows banner with image and link.';
    private static $icon = '<i class="icon font-icon-block-banner"></i>';
    private static $table_name = 'BannerWidget';

    private static $has_one = [
        'Image' => Image::class,
    ];

    private static $owns = [
        'Image',
    ];

    private static $extensions = [
        ElementImageWidget::class,
    ];

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $fields->push(UploadField::create('Image', 'Image')
                ->setAllowedFileCategories(['image/supported']));

        return $fields;
    }

    public function getSibling()
    {
    	return false;
    }
}
