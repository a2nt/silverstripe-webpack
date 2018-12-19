<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/30/18
 * Time: 11:54 PM
 */

namespace Site\Elements;

use Dynamic\Elements\Flexslider\Elements\ElementSlideshow;
use Dynamic\FlexSlider\Model\SlideImage;
use Dynamic\FlexSlider\ORM\FlexSlider;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\ReadonlyField;
use Symbiote\GridFieldExtensions\GridFieldEditableColumns;

class SliderElement extends ElementSlideshow
{
    private static $singular_name = 'Slider';

    private static $plural_name = 'Sliders';

    private static $description = 'Displays slideshow';

    private static $table_name = 'SliderElement';

    private static $extensions = [
        FlexSlider::class,
    ];

    private static $owns = [
        'Slides',
    ];

    private $items;

    public function getType()
    {
        return self::$singular_name;
    }

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        // remove in case you don't need to provide this functionality
        $fields->removeByName([
            'ConfigHD',
            'Animation',
            'Loop',
            'Animate',
            'ThumbnailNav',
            'SliderControlNav',
            'SliderDirectionNav',
            'CarouselControlNav',
            'CarouselDirectionNav',
            'CarouselThumbnailCt',
        ]);

        $grid = $fields->dataFieldByName('Slides');
        $config = $grid->getConfig();

        $columns = new GridFieldEditableColumns();
        $columns->setDisplayFields([
            'Hide'  => [
                'title' => 'Hide it?',
                'field' => CheckboxField::class,
            ],
        ]);

        $config->addComponent($columns);

        return $fields;
    }

    /**
     * @return mixed
     */
    public function getSlideShow()
    {
        if($this->items) {
            return $this->items;
        }

        $date = date('Y-m-d H:i:s');
        $this->items = $this->Slides()->filter([
            'Hide' => '0',
        ])->filterByCallback(function($item, $list) use ($date) {
            $on = $item->getField('DateOn');
            $off = $item->getField('DateOff');

            return ($on <= $date) && (!$off || $off > $date);
        })->sort('SortOrder');

        return $this->items;
    }
}
