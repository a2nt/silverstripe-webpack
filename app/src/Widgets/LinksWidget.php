<?php


namespace Site\Widgets;

use Sheadawson\Linkable\Forms\LinkField;
use Sheadawson\Linkable\Models\Link;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Widgets\Model\Widget;

if (!class_exists(Widget::class)) {
    return;
}

class LinksWidget extends Widget
{
    private static $title = 'Links';
    private static $cmsTitle = 'Links';
    private static $description = 'Shows listing of links.';
    private static $icon = '<i class="icon font-icon-list"></i>';
    private static $table_name = 'LinksWidget';

    private static $many_many = [
        'Links' => Link::class,
    ];

    private static $owns = [
        'Links',
    ];

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        if($this->ID) {
            $fields->push(GridField::create(
                'Links',
                '',
                $this->Links(),
                GridFieldConfig_RecordEditor::create()
            ));
        }else{
            $fields->push(LiteralField::create(
                'Note',
                '<p class="alert alert-warning"><b>Note:</b> The widget needs to be saved before adding a link.'
                .' Enter the Title and click "+ Create" button at the bottom left corner of the screen</p>')
            );
        }

        return $fields;
    }
}
