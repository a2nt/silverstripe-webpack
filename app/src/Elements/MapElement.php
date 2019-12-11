<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/30/18
 * Time: 11:54 PM
 */

namespace Site\Elements;

use A2nt\SilverStripeMapboxField\MapboxField;
use BetterBrief\GoogleMapField;
use DNADesign\Elemental\Models\ElementContent;
use SilverStripe\Core\Config\Config;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\Forms\NumericField;
use Site\Controllers\MapElementController;
use Site\Extensions\MapExtension;

class MapElement extends ElementContent
{
    private static $icon = 'font-icon-globe-1';

    private static $singular_name = 'Map Element';

    private static $plural_name = 'Map Element';

    private static $description = 'Displays dynamic map';

    private static $table_name = 'MapElement';

    private static $controller_class = MapElementController::class;
    private static $map_type = 'mapbox';

    private static $extensions = [
        MapExtension::class,
    ];

    public function getType():string
    {
        return self::$singular_name;
    }

    public function getCMSFields(): FieldList
    {
        $fields = parent::getCMSFields();

        $fields->remove('HTML');

        $tab = $fields->findOrMakeTab('Root.MapPins');
        $tab->setTitle('Description');
        $tab->push(HTMLEditorField::create('HTML', 'Content'));

        $fields->addFieldsToTab('Root.Main', [
            NumericField::create('MapZoom', 'Initial Map Zoom (enter a number from 0 to 24)'),
            GridField::create(
                'Locations',
                'Locations',
                $this->owner->Locations(),
                GridFieldConfig_RelationEditor::create(100)
            )
        ]);

        return $fields;
    }

    public function MapAPIKey(): string
    {
        $type = self::config()->get('map_type');

        switch ($type) {
            case 'mapbox':
                $key = MapboxField::getAccessToken();
                break;
            case 'google-maps':
                $cfg = Config::inst()->get(GoogleMapField::class, 'default_options');
                $key = $cfg['api_key'];
                break;
            default:
                $key = '';
                break;
        }

        return $key;
    }
}
