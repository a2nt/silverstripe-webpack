<?php


namespace Site\Widgets;


use DNADesign\Elemental\Forms\TextCheckboxGroupField;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TreeDropdownField;
use SilverStripe\ORM\DataExtension;

class WidgetExtension extends DataExtension
{
    private static $db = [
        'ShowTitle' => 'Boolean(1)',
    ];

    public function updateCMSFields(FieldList $fields)
    {
        parent::updateCMSFields($fields);
        // Add a combined field for "Title" and "Displayed" checkbox in a Bootstrap input group
        $fields->removeByName('ShowTitle');
        $fields->replaceField(
            'Title',
            TextCheckboxGroupField::create()
                ->setName('Title')
        );
        $fields->push(TreeDropdownField::create(
            'MovePageID', 'Move widget to page', SiteTree::class
        ));
    }

    public function onBeforeWrite()
    {
        $obj = $this->owner;
        $moveID = $obj->MovePageID;
        if ($moveID) {
            $page = \Page::get()->byID($moveID);
            if($page) {
                $sidebarID = $page->getField('SideBarID');
                if($sidebarID) {
                    $obj->setField('ParentID', $sidebarID);
                }
            }
        }

        parent::onBeforeWrite();
    }
}
