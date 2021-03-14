<?php


namespace App\Extensions;

use SilverStripe\Blog\Forms\GridField\GridFieldConfigBlogPost;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataExtension;

class BlogExtension extends DataExtension
{
    public function updateCMSFields(FieldList $fields)
    {
        $f = $fields->dataFieldByName('ChildPages');
        if ($f) {
            $f->setConfig(GridFieldConfigBlogPost::create(75));
        }
    }
}
