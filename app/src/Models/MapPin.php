<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 9/12/18
 * Time: 2:55 AM
 */

namespace Site\Models;

use A2nt\SilverStripeMapboxField\MapboxField;
use A2nt\SilverStripeMapboxField\MarkerExtension;
use Sheadawson\Linkable\Forms\LinkField;
use Sheadawson\Linkable\Models\Link;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\ORM\DataObject;
use SilverStripe\Versioned\Versioned;
use Site\Elements\MapElement;
use Symbiote\Addressable\Addressable;

class MapPin extends DataObject
{
    private static $table_name = 'MapPin';

    private static $db = [
        'Title' => 'Varchar(255)',
    ];

    private static $has_one = [
        'PhoneNumber' => Link::class,
        'Fax' => Link::class,
    ];

    private static $extensions = [
        Addressable::class,
        MarkerExtension::class,
        Versioned::class,
    ];

    private static $belongs_many_many = [
        'MapElements' => MapElement::class,
    ];

    private static $default_sort = 'Title ASC, ID DESC';

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $fields->removeByName('MapElements');

        $fields->replaceField(
            'PhoneNumberID',
            LinkField::create('PhoneNumberID', 'Phone Number')
                ->setAllowedTypes(['Phone'])
        );

        $fields->replaceField(
            'FaxID',
            LinkField::create('FaxID', 'FAX')
                ->setAllowedTypes(['Phone'])
        );
        $fields->removeByName(['Map', 'LatLngOverride', 'Lng','Lat']);

        $fields->addFieldsToTab('Root.Main', [
            CheckboxField::create('LatLngOverride', 'Override Latitude and Longitude?')
                ->setDescription('Check this box and save to be able to edit the latitude and longitude manually.'),
            MapboxField::create('Map', 'Choose a location', 'Lat', 'Lng'),
        ]);

        return $fields;
    }

    public function onBeforeWrite()
    {
        parent::onBeforeWrite();

        $lng = $this->getField('Lng');
        $lat = $this->getField('Lat');

        // geocode
        try {
            // reverse geocoding get address
            if (!$this->hasAddress() && $lng && $lat) {
                require_once BASE_PATH . '/app/thirdparty/geocoding-example/php/Mapbox.php';
                $mapbox = new \Mapbox(MapboxField::getAccessToken());

                // GET Address
                $res = $mapbox->reverseGeocode($lng, $lat);
                if ($res->success() && $res->getCount()) {
                    $res = $res->getData();
                    if (count($res) && isset($res[0]['place_name'])) {
                        $details = explode(',', $res[0]['place_name']);
                        $fields = [
                            'Address',
                            'City',
                            'State',
                            //'Country',
                        ];

                        $n = count($fields);
                        for ($i = 0; $i < $n; $i++) {
                            if (!isset($details[$i])) {
                                continue;
                            }

                            $name = $fields[$i];
                            $val = $details[$i];

                            // get postal code
                            if ($name === 'State') {
                                $this->setField('PostalCode', substr($val, strrpos($val, ' ')+1));
                            }

                            $this->setField($name, $val);
                        }
                    }
                }
            }
        } catch (\Exception $e) {
        }
    }
}
