<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/30/18
 * Time: 11:37 PM
 * Ref: Dynamic\FlexSlider\Model\SlideImage
 */

namespace App\Extensions;

use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\DatetimeField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\ToggleCompositeField;
use SilverStripe\ORM\DataExtension;

class SlideImageExtension extends DataExtension
{
    private static $db = [
        'Hide' => 'Boolean(0)',
        'DateOn' => 'Datetime',
        'DateOff' => 'Datetime',
    ];

    private $_cache = [];

    public function getElement()
    {
        if(!isset($this->_cache['element'])) {
            $this->_cache['element'] = $this->owner->SlideshowElement();
        }

        return $this->_cache['element'];
    }

    public function getSlideWidth()
    {
        $element = $this->getElement();
        return $element->getSlideWidth();
    }

    public function getSlideHeight()
    {
        $element = $this->getElement();
        return $element->getSlideHeight();
    }

    public function updateCMSFields(FieldList $fields)
    {
        parent::updateCMSFields($fields);

        $fields->removeByName([
            'PageLinkID',
            'Hide',
            'DateOn',
            'DateOff',
        ]);


        $fields->dataFieldByName('Image')
            ->setTitle('Image ('.$this->getSlideWidth().' x '.$this->getSlideHeight().' px)');

        $fields->addFieldToTab('Root.Main', ToggleCompositeField::create(
            'ConfigHD',
            'Slide Settings',
            [
                CheckboxField::create('Hide', 'Hide this slide? (That will hide the slide regardless of start/end fields)'),
                DatetimeField::create('DateOn', 'When would you like to start showing the slide?'),
                DatetimeField::create('DateOff', 'When would you like to stop showing the slide?'),
            ]
        ));
    }
}
