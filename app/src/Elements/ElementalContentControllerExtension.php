<?php


namespace Site\Elements;


use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\CMS\Model\SiteTree;

class ElementalContentControllerExtension extends \DNADesign\Elemental\Extensions\ElementalContentControllerExtension
{
    private static $allowed_actions = array(
        'handleElement'
    );

    public function handleElement()
    {
        $id = $this->owner->getRequest()->param('ID');

        if (!$id) {
            user_error('No element ID supplied', E_USER_ERROR);
            return false;
        }

        /** @var SiteTree $elementOwner */
        //$elementOwner = $this->owner->data();

        /*$elementalAreaRelations = $this->owner->getElementalRelations();

        if (!$elementalAreaRelations) {
            user_error(get_class($this->owner) . ' has no ElementalArea relationships', E_USER_ERROR);
            return false;
        }*/

        $element = BaseElement::get()->byID($id);

        if ($element) {
            return $element->getController();
        }

        user_error('Element $id not found', E_USER_ERROR);
        return false;
    }
}
