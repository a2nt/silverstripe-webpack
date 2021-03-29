<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/23/18
 * Time: 1:23 PM
 */

namespace App\Elements\Extensions;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\TreeDropdownField;
use SilverStripe\ORM\DataExtension;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\LiteralField;

class BaseElementEx extends DataExtension
{


    public function updateCMSFields(FieldList $fields)
    {
        $obj = $this->owner;
        parent::updateCMSFields($fields);
        $tab = $fields->findOrMakeTab('Root.Settings');

        $tab->push(LiteralField::create(
            'ClassName',
            '<div class="form-group field text">'
            .'<div class="form__field-label">Class</div>'
            .'<div class="form__field-holder">'.$obj->getField('ClassName').'</div>'
            .'</div>'
        ));

        if($this->owner->ID) {
	        $tab->push(TreeDropdownField::create(
		        'MoveElementIDToPage',
		        'Move an element to page',
		        SiteTree::class
	        )->setEmptyString('(select an element to move)'));
        }
    }

    public static function MoveElementToPage($ID, $moveToID)
    {
    	$el = BaseElement::get()->byID($ID);
        $page = SiteTree::get()->byID($moveToID);
        if (!$page || !$el) {
            return false;
        }

        $el->setField('ParentID', $page->ElementalArea()->ID);
        $el->write();

        return true;
    }

    public function onBeforeWrite()
    {
        parent::onBeforeWrite();

		$moveID = $this->owner->getField('MoveElementIDToPage');
		if($this->owner->ID && $moveID) {
			self::MoveElementToPage($this->owner->ID, $moveID);
		}
    }
}
