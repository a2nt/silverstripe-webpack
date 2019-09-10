<?php

namespace Site\Extensions;

use SilverStripe\Forms\TextareaField;
use SilverStripe\ORM\DataExtension;
use SilverStripe\Forms\FieldList;

class SiteTreeExtension extends DataExtension
{
    private static $db = [
        'ExtraCode' => 'Text',
    ];

    public function updateCMSFields(FieldList $fields)
    {
        $fields->addFieldsToTab('Root.Settings', [
            TextareaField::create(
                'ExtraCode',
                'Extra page specific HTML code'
            ),
        ]);
    }
}
