<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/30/18
 * Time: 11:54 PM
 */

namespace Site\Elements;

use A2nt\SilverStripeMapboxField\MapboxField;
use DNADesign\Elemental\Models\ElementContent;
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

    private static $extensions = [
        MapExtension::class,
    ];

    public function getType()
    {
        return self::$singular_name;
    }

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $fields->removeByName('Locations');

        return $fields;
    }

    public function MapAPIKey()
    {
        return MapboxField::getAccessToken();
    }
}
