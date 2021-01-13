<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/24/18
 * Time: 1:46 AM
 */

namespace Site\Extensions;

use Dynamic\Elements\Image\Elements\ElementImage;
use Sheadawson\Linkable\Forms\LinkField;
use Sheadawson\Linkable\Models\Link;
use SilverStripe\Core\Config\Config;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataExtension;

class ElementImageWidget extends DataExtension
{
    private static $available_heights = [
        '300' => 'Small (300px)',
        '400' => 'Medium (400px)',
        '600' => 'Big (600px)',
    ];

    private static $available_widths = [
    	'300' => 'Small (300px)',
        '400' => 'Medium (400px)',
        '600' => 'Big (600px)',
    ];

    private static $db = [
        'Resize' => 'Boolean(1)',
	    'ManualWidth' => 'Boolean(0)',
        'ImageHeight' => 'Float',
	    'ImageWidth' => 'Float',
        'Content' => 'HTMLText',
    ];

    private static $has_one = [
        'ImageLink' => Link::class,
    ];

    public function updateCMSFields(FieldList $fields)
    {
        parent::updateCMSFields($fields);

        $fields->removeByName(['ImageLinkID', 'Resize']);

        $fields->push(LinkField::create('ImageLinkID', 'Link'));

        $this->owner->ImageHeight = $this->getHeight();

        $heights = Config::inst()->get(__CLASS__, 'available_heights');
        $widths = Config::inst()->get(__CLASS__, 'available_widths');

        $fields->push(CheckboxField::create(
            'Resize',
            'Would you like to scale image?'
        ));

        if (count($heights)) {
        	$fields->removeByName(['ManualWidth','ImageWidth', 'ImageHeight']);
            $fields->push(
                CompositeField::create(
	                DropdownField::create(
	                    'ImageHeight',
	                    'Image Height',
	                    $heights,
	                    $this->getHeight()
	                )
	                    ->setEmptyString('(auto)')
                        ->displayIf('Resize')->isChecked()->end(),
	                CheckboxField::create('ManualWidth', 'Set Width Manually')
                        ->displayIf('Resize')->isChecked()->end(),
	                DropdownField::create(
	                    'ImageWidth',
	                    'Image Width',
	                    $widths
	                )
	                    ->setEmptyString('(auto)')
	                    ->displayIf('ManualWidth')->isChecked()->end()
                )
            );
        } else {
            $fields->dataFieldByName('ImageHeight')
                ->setValue($this->getHeight());
        }
    }

    public function ImageResized()
    {
        $image = $this->owner->Image();

        if (!$this->owner->Resize) {
            return $image;
        }

        $width = $this->getWidth();
        $height = $this->getHeight();

        if (!$width || $width === 'auto') {
            return $height > 0
            ? $image->ScaleHeight($height)
            : $image;
        }

        return $height > 0
            ? $image->Fill($width, $height)
            : $image->ScaleWidth($width);
    }

    public function getWidth()
    {
    	$obj = $this->owner;
        return $obj->getField('ManualWidth') && $obj->getField('ImageWidth')
	        ? $obj->getField('ImageWidth')
	        : $obj->getColumnWidthRecursive();
    }

    public function getHeight()
    {
        $height = $this->owner->getField('ImageHeight');
        if ($height > 0) {
            return $height;
        }

        $sibling = $this->owner->getSibling(false, [
            'ImageHeight:GreaterThan' => '0'
        ]);

        if ($sibling && $sibling->getField('ImageHeight')) {
            return $sibling->getField('ImageHeight');
        }

        return 0;
    }
}
