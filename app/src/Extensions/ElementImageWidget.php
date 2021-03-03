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

    private static $available_ratios = [
        '1:1' => '1:1',
        '3:2' => '3:2',
        '2:3' => '2:3',
        '16:9' => '16:9'
    ];

    private static $db = [
        'Resize' => 'Boolean(1)',
        'ManualWidth' => 'Boolean(0)',
        'ImageHeight' => 'Float',
        'ImageWidth' => 'Float',
        'ImageAspectRatio' => 'Text',
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
        $widths = Config::inst()->get(__CLASS__, 'available_widths');
        $ratios = Config::inst()->get(__CLASS__, 'available_ratios');

        $fields->replaceField('Resize', CheckboxField::create(
            'Resize',
            'Would you like to scale image?'
        ));
        $fields->removeByName(['ManualWidth','ImageWidth','ImageAspectRatio',]);

        if (count($heights)) {
            $fields->replaceField(
                'ImageHeight',
                CompositeField::create(
                    CheckboxField::create(
                        'ManualAspectRatio',
                        'Set Aspect Ratio',
                        ($this->owner->getField('ImageAspectRatio') ? '1' : '0')
                    ),
                    DropdownField::create(
                        'ImageAspectRatio',
                        'Image Aspect Ratio (width:height)',
                        $ratios
                    )
                            ->setEmptyString('(original)')
                            ->displayIf('ManualAspectRatio')->isChecked()
                            ->andIf('ManualWidth')->isNotChecked()
                            ->end(),
                    DropdownField::create(
                        'ImageHeight',
                        'Image Height',
                        $heights,
                        $this->getHeight()
                    )
                            ->setEmptyString('(auto)')
                            ->displayIf('Resize')->isChecked()->end(),
                    CheckboxField::create('ManualWidth', 'Set Width Manually')
                            ->displayIf('Resize')->isChecked()
                            ->andIf('ManualAspectRatio')->isNotChecked()
                            ->end(),
                    DropdownField::create(
                        'ImageWidth',
                        'Image Width',
                        $widths
                    )
                            ->setEmptyString('(auto)')
                            ->displayIf('ManualWidth')->isChecked()
                            ->end()
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
        $ratio = $this->owner->getField('ImageAspectRatio');

        if ($ratio) {
            $v = explode(':', $this->owner->getField('ImageAspectRatio'));
            $x = $v[0];
            $y = $v[1];

            if ($width > 0 && $width !== 'auto') {
                $height = $width*$y/$x;
                echo 'a1';
            } elseif ($height && $height > 0) {
                $width = $height*$x/$y;
                echo 'a2';
            }
            var_dump($width);
            var_dump($height);
        }

        if (!$width || $width === 'auto') {
            return $height > 0
            ? $image->ScaleHeight($height)
            : $image;
        }

        return $height > 0
            ? $image->FocusFill($width, $height)
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
