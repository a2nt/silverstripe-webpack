<?php


namespace Site\Widgets;


use DNADesign\Elemental\Forms\ElementalAreaField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Widgets\Forms\WidgetAreaEditor;
use SilverStripe\Widgets\Model\Widget;

class WidgetPageExtension extends \SilverStripe\Widgets\Extensions\WidgetPageExtension
{
    public function updateCMSFields(FieldList $fields)
    {
        parent::updateCMSFields($fields);

        $tab = $fields->findOrMakeTab('Root.Widgets');

        $tab->setTitle('Sidebar');

        $tab->removeByName('SideBar');

        $widgetTypes =  WidgetAreaEditor::create('Sidebar')->AvailableWidgets();
        $available = [];
        /** @var Widget $type */
        foreach ($widgetTypes as $type) {
            $available[get_class($type)] = $type->getCMSTitle();
        }

        $tab->push(WidgetAreaField::create(
            'SideBar',
            $this->owner->Sidebar(),
            $available
        ));
    }
}
