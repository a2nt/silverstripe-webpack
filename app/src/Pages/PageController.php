<?php

// vendor/silverstripe/errorpage/src/ErrorPageController.php
// extends global PageController class
//namespace Site\Pages;

use SilverStripe\CMS\Controllers\ContentController;
use SilverStripe\ORM\FieldType\DBDatetime;
use SilverStripe\Blog\Model\BlogPost;

class PageController extends ContentController
{
    private static $static_path = '/resources/app/client/dist/';

    public function RecentBlogPosts()
    {
        return BlogPost::get()->sort('PublishDate DESC');
    }

    public function StaticPath($path = '')
    {
        return self::join_links($this->config()->get('static_path'), $path);
    }

    public function CurrentTime()
    {
        return DBDatetime::now();
    }
}
