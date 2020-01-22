<?php


namespace Site\Widgets;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\ElementalList\Model\ElementList;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\TreeDropdownField;
use SilverStripe\Widgets\Model\Widget;

if (!class_exists(Widget::class)) {
    return;
}

class ElementWidget extends Widget
{
    private static $title = 'Virtual Element';
    private static $cmsTitle = 'Virtual Element';
    private static $description = 'Adds existing element to side bar';
    private static $icon = '<i class="icon font-icon-block-banner"></i>';
    private static $table_name = 'ElementWidget';

    private static $has_one = [
        'Element' => BaseElement::class,
    ];

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $fields->push(
            DropdownField::create(
                'ElementID',
                'Displayed Element',
                BaseElement::get()
                    ->filter(['AvailableGlobally' => true])
                    ->exclude(['ClassName' => ElementList::class])
            )
            /*TreeDropdownField::create(
                'ElementID',
                'Displayed Element',
                SiteTree::class
            )->setFilterFunction(static function($el){
                return (bool) $el->getField('ElementalArea')->Elements()->count();
            })*/
        );

        return $fields;
    }

    public function SimpleClassName()
    {
        $el = $this->getField('Element');
        var_dump($el);
        die();
        return  $el->getSimpleClassName();
    }
}
