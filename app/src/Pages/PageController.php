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
        $message = $session->get('SiteWideMessage');
        $session->clear('SiteWideMessage');

        return $message;
    }

    public function CurrentTime()
    {
        return DBDatetime::now();
    }
}
