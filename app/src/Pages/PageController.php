<?php

// vendor/silverstripe/errorpage/src/ErrorPageController.php
// extends global PageController class
//namespace Site\Pages;

use SilverStripe\CMS\Controllers\ContentController;
use SilverStripe\ORM\FieldType\DBDatetime;

class PageController extends ContentController
{
    public static function setSiteWideMessage($message, $type, $request = null)
    {
        $request = $request ? $request : Controller::curr()->getRequest();
        $request->getSession()->set(
            'SiteWideMessage',
            ArrayData::create([
                'Message' => $message,
                'Type' => $type,
            ])
        );
    }

    public function getSiteWideMessage()
    {
        if (!$this->site_message) {
            $session = $this->getRequest()->getSession();
            $this->site_message = $session->get('SiteWideMessage');
            $session->clear('SiteWideMessage');
        }

        return $this->site_message;
    }

    public function CurrentTime()
    {
        return DBDatetime::now();
    }
}
