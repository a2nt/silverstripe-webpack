<?php

// vendor/silverstripe/errorpage/src/ErrorPageController.php
// extends global PageController class
//namespace Site\Pages;

use SilverStripe\CMS\Controllers\ContentController;
use SilverStripe\ORM\FieldType\DBDatetime;

class PageController extends ContentController
{
    public function setSiteWideMessage($message, $type)
    {
        $this->getRequest()->getSession()->set(
            'SiteWideMessage',
            [
                'Message' => $message,
                'Type' => $type,
            ]
        );
    }

    public function getSiteWideMessage()
    {
        $session = $this->getRequest()->getSession();
        $session->clear('SiteWideMessage');

        return $session->get('SiteWideMessage');
    }

    public function CurrentTime()
    {
        return DBDatetime::now();
    }
}
