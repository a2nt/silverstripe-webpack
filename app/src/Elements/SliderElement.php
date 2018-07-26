<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/30/18
 * Time: 11:54 PM
 */

namespace Site\Elements;

use Dynamic\Elements\Flexslider\Elements\ElementSlideshow;
use Dynamic\FlexSlider\ORM\FlexSlider;

class SliderElement extends ElementSlideshow
{
    private static $singular_name = 'Slider';

    private static $plural_name = 'Sliders';

    private static $description = 'Displays slideshow';

    private static $table_name = 'SliderElement';

    private static $extensions = [
        FlexSlider::class,
    ];

    public function getType()
    {
        return self::$singular_name;
    }
}
