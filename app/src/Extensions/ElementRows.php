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
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\DropdownField;
use SilverStripe\ORM\DataExtension;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\LiteralField;

class ElementRows extends DataExtension
{
    private static $container_max_width = 1140;
    private static $column_class = 'col-block col-md';

    private static $container_styles = [
        'container' => 'Fixed container',
        'container-fluid' => 'Fluid Container',
    ];

    private static $db = [
        'ContainerType' => 'Varchar(254)',
        'Size' => 'Enum("1,2,3,4,5,6,7,8,9,10,11,12,auto","auto")',
    ];

    public function updateCMSFields(FieldList $fields)
    {
        parent::updateCMSFields($fields);

        // move available globaly to main tab
        $fields->removeByName('AvailableGlobally');

        $tab = $fields->findOrMakeTab('Root.Main');
        $tab->push(CheckboxField::create('AvailableGlobally'));

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

        // site-specific
        $fields->removeByName('ContainerType');

        // column size
        if ($this->isColumn()) {
            $sizes = $this->owner->dbObject('Size');
            $defaultSize = $sizes->getDefaultValue();

            $sizeDropdown = DropdownField::create(
                'Size',
                _t(
                    __CLASS__.'.SIZE',
                    'Column Width (max 12 cols)'
                ),
                array_combine(
                    array_values($sizes->enumValues()),
                    [
                        '8.3% (1 of 12)',
                        '16.6% (2 of 12)',
                        '25% (3 of 12)',
                        '33% (4 of 12)',
                        '41.6% (5 of 12)',
                        '50% (6 of 12)',
                        '58.3% (7 of 12)',
                        '66.4% (8 of 12)',
                        '74.7% (9 of 12)',
                        '83% (10 of 12)',
                        '91.3% (11 of 12)',
                        '100% (12 of 12)',
                        'auto',
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

        $tab = $fields->findOrMakeTab('Root.Settings')
        ->push(LiteralField::create(
            'ClassName',
            '<div class="form-group field text">'
            .'<div class="form__field-label">Class</div>'
            .'<div class="form__field-holder">'.$this->owner->getField('ClassName').'</div>'
            .'</div>'
        ));
    }

    public function getWidthPercetage()
    {
        return $this->isColumn() ? $this->owner->getField('Size') / self::colsNumber() * 100 : false;
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
            return $object->getField('Size');
        }

        $parent = $object->Parent()->getOwnerPage();

        if (is_a($parent, 'Page')) {
            return ($this->owner->getField('ContainerType') === 'container-fluid') ? false : self::colsNumber();
        }

        return $object->getColumnSizeRecursive($parent);
    }

    public function getColumnWidthRecursive($object = null, $max = null)
    {
        $max = $max ? $max : self::maxWidth();

        $object = $object ? $object : $this->owner;

        if (!$object->isRoot()) {
            $size = $object->getField('Size');
            $cols = self::colsNumber();

            if ($size === 'auto') {
                return $size;
            }

            $max = $size ? $max / ($cols / $size) : $max;
            $parent = $object->Parent()->getOwnerPage();

            return $this->getColumnWidthRecursive($parent, $max);
        }

        return $max;
    }

    public static function colsNumber()
    {
        $db = Config::inst()->get(self::class, 'db');
        $sizes = $db['Size'];
        $sizes = preg_replace('!Enum\("([0-9A-z,]+)","([0-9A-z]+)"\)!i', '$1', $sizes);
        $sizes = explode(',', $sizes);

        // remove auto
        $k = array_search('auto', $sizes);
        if ($k !== false) {
            unset($sizes[$k]);
        }

        return max($sizes);
    }

    public static function maxWidth()
    {
        return Config::inst()->get(self::class, 'container_max_width');
    }

    public function ExtraClass()
    {
        $object = $this->owner;

        return $object->getField('ExtraClass')
            .(
                $this->isColumn()
                ? ' '.Config::inst()->get(self::class, 'column_class')
                .($object->getField('Size') === 'auto' ? '' : '-'.$object->getField('Size'))
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
            $type = \Page::DefaultContainer();
        }

        return $type;
    }
}
