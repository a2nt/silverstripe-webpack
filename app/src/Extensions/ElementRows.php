<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/23/18
 * Time: 1:23 PM
 */

namespace Site\Extensions;


use DNADesign\ElementalList\Model\ElementList;
use SilverStripe\Forms\DropdownField;
use SilverStripe\ORM\DataExtension;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\FieldType\DBEnum;

class ElementRows extends DataExtension
{
    private static $column_class = 'col-md-';
    private static $container_styles = [
      'container' => 'Fixed container',
      'container-fluid' => 'Fluid Container',
    ];

    private static $db = [
      'Size' => 'Enum("1,2,3,4,5,6,7,8,9,10,11,12","6")',
    ];

    public function updateCMSFields(FieldList $fields)
    {
        $tab = $fields->findOrMakeTab('Root.Main');

        if($this->isRoot() && $this->isList()) {
            $styleDropdown = $fields->dataFieldByName('Style');
            if ($styleDropdown) {
                $styleDropdown->setSource(self::$container_styles);
            } else {
                $styleDropdown = DropdownField::create(
                    'Style',
                    _t(__CLASS__.'.STYLE', 'Style variation'),
                    self::$container_styles
                );
                $fields->insertBefore($styleDropdown, 'ExtraClass');
            }
        }

        if($this->isColumn()) {
            $sizes = $this->owner->dbObject('Size');
            $defaultSize = $sizes->getDefaultValue();

            $sizeDropdown = DropdownField::create(
                'Size',
                'Column Size (12 cols grid, ex. for 3 equal cols: 12/3 = 4 is the size that you need)',
                $sizes->enumValues()
            );
            $tab->push($sizeDropdown);

            // set default size
            if(!$this->owner->getField('Size')){
                $sibling = $this->owner->Parent()
                    ->Elements()
                    ->exclude('ID', $this->owner->ID)
                    ->last();

                $sizeDropdown->setValue($sibling ? $sibling->getField('Size') : $defaultSize);
            }
        }else{
            $fields->removeByName('Size');
        }
    }

    public function isList()
    {
        return is_a($this->owner, ElementList::class);
    }

    public function isRow()
    {
        if(!$this->isList()){
            return false;
        }

        return true;
    }

    public function isColumn()
    {
        if(!$this->isRoot() && !$this->isRow()){
            return true;
        }

        return false;
    }

    public function isRoot()
    {
        $parent = $this->owner->Parent()->getOwnerPage();
        if(is_a($parent, 'Page')){
            return true;
        }

        return false;
    }

    public function ExtraClass()
    {
        return $this->isColumn()
            ? self::$column_class.$this->owner->getField('Size')
            : '';
    }

    /*
     * if it's root element and it doesn't contain any container styles
     * add the first one
     */
    public function updateStyleVariant(&$style)
    {
        $style = $this->owner->getField('Style');
        $container_styles = array_keys(self::$container_styles);

        if(
            $this->isRoot()
            && $this->isList()
            && !in_array($style, $container_styles)
        ){
            $style = $container_styles[0];
        }
    }
}