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

    private static $db = [
        'ImageHeight' => 'Float',
        'Content' => 'HTMLText',
    ];

    private static $has_one = [
        'ImageLink' => Link::class,
    ];

    public function updateCMSFields(FieldList $fields)
    {
        parent::updateCMSFields($fields);

        $fields->insertBefore(
            'Image',
            LinkField::create('ImageLinkID', 'Link')
        );

        $this->owner->ImageHeight = $this->getHeight();

        $heights = Config::inst()->get(__CLASS__, 'available_heights');
        if (count($heights)) {
            $fields->replaceField(
                'ImageHeight',
                DropdownField::create(
                    'ImageHeight',
                    'Image Height',
                    $heights,
                    $this->getHeight()
                )->setEmptyString('(unspecified)')
            );
        } else {
            $fields->dataFieldByName('ImageHeight')
                ->setValue($this->getHeight());
        }
    }

    public function ImageResized()
    {
        $image = $this->owner->Image();
        $width = $this->getWidth();
        $height = $this->getHeight();

        if (!$width) {
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
        $columnSize = $this->owner->getColumnSizeRecursive();
        if (!$columnSize) {
            return false;
        }

        $max = Config::inst()->get(ElementRows::class, 'container_max_width');
        $size = 12 / $columnSize;

        return $max / $size;
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
