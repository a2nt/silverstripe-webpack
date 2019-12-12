<?php


namespace Site\Widgets;

use Sheadawson\Linkable\Forms\LinkField;
use Sheadawson\Linkable\Models\Link;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Widgets\Model\Widget;

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
        'Link' => Link::class,
    ];

    private static $owns = [
        'Image',
        'Link',
    ];

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $fields->push(UploadField::create('Image')
                ->setAllowedFileCategories(['image/supported']));

        $fields->push(LinkField::create('LinkID', 'Link'));

        return $fields;
    }
}
