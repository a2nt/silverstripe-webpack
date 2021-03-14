<?php


namespace App\Extensions;

use SilverStripe\Blog\Forms\GridField\GridFieldConfigBlogPost;
use SilverStripe\Core\Extension;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataExtension;

class CompositeFieldExtension extends CompositeField
{
    public function extraClass()
    {
        return 'composite '.parent::extraClass();
    }

    public function getAttributes()
    {
        $attrs = parent::getAttributes();
        unset($attrs['name'], $attrs['type'], $attrs['disabled'], $attrs['readonly'], $attrs['autofocus']);

        return $attrs;
    }
}
