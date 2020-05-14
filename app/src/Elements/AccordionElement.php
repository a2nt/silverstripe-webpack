<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/30/18
 * Time: 11:54 PM
 */

namespace Site\Elements;

use DNADesign\ElementalList\Model\ElementList;

class AccordionElement extends ElementList
{
    private static $singular_name = 'Accordion Element';

    private static $plural_name = 'Accordion Element';

    private static $description = 'Displays Accordion of Elements';

    private static $table_name = 'AccordionElement';

    public function getType()
    {
        return self::$singular_name;
    }

    public function Accordion()
    {
        return $this->Elements()->renderWith(static::class.'_AccordionArea');
    }
}
