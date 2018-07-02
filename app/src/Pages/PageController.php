<?php

// vendor/silverstripe/errorpage/src/ErrorPageController.php
// extends global PageController class
//namespace Site\Pages;

use SilverStripe\CMS\Controllers\ContentController;
use SilverStripe\ORM\FieldType\DBDatetime;

class PageController extends ContentController
{
    public function CurrentTime()
    {
        return DBDatetime::now();
    }
}
