<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 8/26/18
 * Time: 12:55 PM
 */

namespace App\Extensions;


use SilverStripe\Core\Extension;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\FieldList;

class AddressExtension extends Extension
{
    public function updateFormFields(FieldList $fields)
    {
        $holder = CompositeField::create();
        foreach ($fields as $field) {
            $holder->push($field);
            $fields->remove($field);
        }

        $holder->addExtraClass('col-sm-6');
        $fields->push($holder);
    }
}
