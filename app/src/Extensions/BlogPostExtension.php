<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 7/2/18
 * Time: 12:10 AM
 */

namespace App\Extensions;

use DNADesign\Elemental\Models\ElementContent;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataExtension;

class BlogPostExtension extends DataExtension
{
    private static $db = [
        'Featured' => 'Boolean(0)',
    ];

    public function updateCMSFields(FieldList $fields)
    {
        $mainTab = $fields->findOrMakeTab('Root.Main');
        $mainTab->push(CheckboxField::create('Featured'));
    }
}
