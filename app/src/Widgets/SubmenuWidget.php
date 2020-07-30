<?php


namespace Site\Widgets;

use SilverStripe\Forms\CheckboxField;
use SilverStripe\Widgets\Model\Widget;

if (!class_exists(Widget::class)) {
    return;
}

class SubmenuWidget extends Widget
{
    private static $title = 'Sub-Menu';
    private static $cmsTitle = 'Sub-Menu';
    private static $description = 'Shows sub menu.';
    private static $icon = '<i class="icon font-icon-tree"></i>';
    private static $table_name = 'SubmenuWidget';

    private static $db = [
        'TopLevelSubmenu' => 'Boolean(1)',
    ];

    public function getPage()
    {
        $area = $this->Parent();
        return \Page::get()->filter('SideBarID', $area->ID)->first();
    }

    public function getSubmenu()
    {
        $page = $this->getPage();

        if(!$this->getField('TopLevelSubmenu')) {
            return $page->Children();
        }

        return $page->Level(1)->Children();
    }

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $fields->push(CheckboxField::create(
            'TopLevelSubmenu',
            'Display sub-menu starting from the top level (otherwise current page children will be displayed)'
        ));

        return $fields;
    }
}
