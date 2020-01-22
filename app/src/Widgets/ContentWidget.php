<?php


namespace Site\Widgets;

use Sheadawson\Linkable\Forms\LinkField;
use Sheadawson\Linkable\Models\Link;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\Widgets\Model\Widget;

if (!class_exists(Widget::class)) {
    return;
}

class ContentWidget extends Widget
{
    private static $title = 'Content';
    private static $cmsTitle = 'Content';
    private static $description = 'Shows text content.';
    private static $icon = '<i class="icon font-icon-block-content"></i>';
    private static $table_name = 'ContentWidget';

    private static $db = [
        'Text' => 'HTMLText',
    ];

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $fields->push(HTMLEditorField::create('Text'));

        return $fields;
    }
}
