<?php


namespace Site\Widgets;


use DNADesign\Elemental\Forms\TextCheckboxGroupField;
use SilverStripe\Forms\FieldList;
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
    }
}
