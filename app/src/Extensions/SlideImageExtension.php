<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/30/18
 * Time: 11:37 PM
 */

namespace Site\Extensions;

use Sheadawson\Linkable\Forms\LinkField;
use Sheadawson\Linkable\Models\Link;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\DatetimeField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\ToggleCompositeField;
use SilverStripe\ORM\DataExtension;

class SlideImageExtension extends DataExtension
{
    private static $db = [
        'Hide' => 'Boolean(0)',
        'DateOn' => 'Datetime',
        'DateOff' => 'Datetime',
    ];

    public function updateCMSFields(FieldList $fields)
    {
        parent::updateCMSFields($fields);

        $fields->removeByName([
            'PageLinkID',
            'Hide',
            'DateOn',
            'DateOff',
        ]);

        $fields->addFieldToTab('Root.Main', ToggleCompositeField::create(
            'ConfigHD',
            'Slide Settings', [
                CheckboxField::create('Hide', 'Hide this slide? (That will hide the slide regardless of start/end fields)'),
                DatetimeField::create('DateOn', 'When would you like to start showing the slide?'),
                DatetimeField::create('DateOff', 'When would you like to stop showing the slide?'),
            ]
        ));
    }
}
