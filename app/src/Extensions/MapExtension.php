<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 8/26/18
 * Time: 12:55 PM
 */

namespace Site\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;
use SilverStripe\Forms\NumericField;
use SilverStripe\ORM\DataExtension;
use Site\Models\MapPin;

class MapExtension extends DataExtension
{
    private static $db = [
        'MapZoom' => 'Int',
    ];

    private static $many_many = [
        'Locations' => MapPin::class,
    ];

    private static $owns = [
        'Locations',
    ];

    public function updateCMSFields(FieldList $fields): void
    {
        parent::updateCMSFields($fields);

        $fields->removeByName('Locations');
        $fields->addFieldsToTab('Root.MapPins', [
            NumericField::create('MapZoom', 'Initial Map Zoom (enter a number from 0 to 24)'),
            GridField::create(
                'Locations',
                'Locations',
                $this->owner->Locations(),
                GridFieldConfig_RelationEditor::create(100)
            )
        ]);

        $fields->findOrMakeTab('Root.MapPins')->setTitle('Locations');
    }

    public function getGeoJSON(): string
    {
        $pins = [];
        foreach ($this->owner->Locations() as $off) {
            $pins[] = $off->getGeo();
        }
        return json_encode([
            'type' => 'MarkerCollection',
            'features' => $pins
        ]);
    }
}
