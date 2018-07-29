<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/23/18
 * Time: 1:23 PM
 */

namespace Site\Extensions;

use DNADesign\ElementalList\Model\ElementList;
use SilverStripe\Core\Config\Config;
use SilverStripe\Forms\DropdownField;
use SilverStripe\ORM\DataExtension;
use SilverStripe\Forms\FieldList;

class ElementRows extends DataExtension
{
    private static $container_max_width = 1140;
    private static $column_class = 'col-block col-md-';

    private static $container_styles = [
        'container' => 'Fixed container',
        'container-fluid' => 'Fluid Container',
    ];

    private static $db = [
        'ContainerType' => 'Varchar(254)',
        'Size' => 'Enum("1,2,3,4,5,6,7,8,9,10,11,12","6")',
    ];

    public function updateCMSFields(FieldList $fields)
    {
        parent::updateCMSFields($fields);

        $tab = $fields->findOrMakeTab('Root.Main');

        // container type
        if ($this->isRoot()) {
            $tab->push(DropdownField::create(
                'ContainerType',
                _t(__CLASS__.'.CONTAINERTYPE', 'Container Type'),
                self::$container_styles
            ));
        } else {
            $fields->removeByName('ContainerType');
        }

        // column size
        if ($this->isColumn()) {
            $sizes = $this->owner->dbObject('Size');
            $defaultSize = $sizes->getDefaultValue();

            $sizeDropdown = DropdownField::create(
                'Size',
                _t(
                    __CLASS__.'.SIZE',
                    'Column Size'
                ),
                array_combine(
                    array_values($sizes->enumValues()),
                    [
                        '8.3%',
                        '16.6%',
                        '25%',
                        '33%',
                        '41.6%',
                        '50%',
                        '58.3%',
                        '66.4%',
                        '74.7%',
                        '83%',
                        '91.3%',
                        '100%',
                    ]
                )
            );
            $tab->push($sizeDropdown);

            // set default size
            if (!$this->owner->getField('Size')) {
                $sibling = $this->getSibling();

                $sizeDropdown->setValue($sibling ? $sibling->getField('Size') : $defaultSize);
            }
        } else {
            $fields->removeByName('Size');
        }
    }

    public function isList()
    {
        return is_a($this->owner, ElementList::class);
    }

    public function isRow()
    {
        if (!$this->isList()) {
            return false;
        }

        return true;
    }

    public function isColumn()
    {
        if (!$this->isRoot()) {
            return true;
        }

        return false;
    }

    public function isRoot()
    {
        $parent = $this->owner->Parent()->getOwnerPage();
        if (is_a($parent, 'Page')) {
            return true;
        }

        return false;
    }

    public function getSibling($any = true, $filter = [], $exclude = [])
    {
        $class = $any ? $this->owner->baseClass() : $this->owner->ClassName;

        return $class::get()->filter(array_merge(
            ['ParentID' => $this->owner->Parent()->ID],
            $filter
        ))->exclude(array_merge(
            ['ID' => $this->owner->ID],
            $exclude
        ))->last();
    }

    public function getColumnSizeRecursive($object = null)
    {
        $object = $object ? $object : $this->owner;

        if ($object->isColumn() && $object->getField('Size')) {
            return (int) $object->getField('Size');
        } else {
            $parent = $object->Parent()->getOwnerPage();

            if (is_a($parent, 'Page')) {
                return ($this->owner->getField('ContainerType') === 'container-fluid') ? false : 12;
            }

            return $object->getColumnSizeRecursive($parent);
        }
    }

    public function ExtraClass()
    {
        return $this->owner->getField('ExtraClass')
            .(
                $this->isColumn()
                ? ' '.Config::inst()->get(self::class, 'column_class').$this->owner->getField('Size')
                : ''
            );
    }

    /*
     * if it's root element and it doesn't contain any container styles
     * add the first one
     */
    public function ContainerClass()
    {
        $type = $this->owner->getField('ContainerType');
        $container_styles = array_keys(self::$container_styles);

        if (!$type && $this->isRoot()) {
            $type = $container_styles[0];
        }

        return $type;
    }
}
