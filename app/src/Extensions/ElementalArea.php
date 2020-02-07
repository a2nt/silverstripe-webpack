<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/23/18
 * Time: 1:23 PM
 */

namespace Site\Extensions;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\DataExtension;
use SilverStripe\ORM\HasManyList;
use SilverStripe\ORM\UnsavedRelationList;

class ElementalArea extends DataExtension
{
    public function ElementFilteredControllers()
    {
        // Don't try and process unsaved lists
        if ($this->Elements() instanceof UnsavedRelationList) {
            return ArrayList::create();
        }

        $controllers = ArrayList::create();
        $items = $this->Elements()->filterByCallback(static function (BaseElement $item) {
            return $item->canView();
        });

        if ($items !== null) {
            foreach ($items as $element) {
                $controller = $element->getController();
                $controllers->push($controller);
            }
        }

        return $controllers;
    }

    /**
     * A cache-aware accessor for the elements
     * @return ArrayList|HasManyList|BaseElement[]
     */
    public function Elements()
    {
        return $this->owner->Elements();//->exclude('SidebarOnly', true);
    }
}
