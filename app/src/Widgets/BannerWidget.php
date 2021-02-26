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

        $fields->push(UploadField::create('Image', 'Image (minimal width 301px)')
                ->setAllowedFileCategories(['image/supported']));

        $fields->push(LinkField::create('LinkID', 'Link'));

        return $fields;
    }

    private $_random;
    public function Random()
    {
        if (!$this->_random) {
            $this->_random = self::get()->filter('Enabled', true)->sort('RAND()')->first();
        }

        return $this->_random;
    }

    public function onBeforeWrite()
    {
    	$title = $this->getField('Title');
    	$img = $this->Image();
    	if(!$title && $img) {
    		$this->setField('Title', $img->getTitle());
	    }

	    parent::onBeforeWrite();
    }
}
