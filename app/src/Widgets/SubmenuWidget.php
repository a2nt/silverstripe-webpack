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

class SubmenuWidget extends Widget
{
    private static $title = 'Sub-Menu';
    private static $cmsTitle = 'Sub-Menu';
    private static $description = 'Shows sub menu.';
    private static $icon = '<i class="icon font-icon-tree"></i>';
    private static $table_name = 'SubmenuWidget';

    public function getPage()
    {
        $area = $this->Parent();
        return \Page::get()->filter('SideBarID', $area->ID)->first();
    }

    public function getSubmenu()
    {
        $page = $this->getPage();

        $children = $page->Children();
        $children = $children->count() ? $children : $page->Level(1)->Children();

        return $children;
    }
}
