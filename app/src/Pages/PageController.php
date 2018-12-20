<?php

// vendor/silverstripe/errorpage/src/ErrorPageController.php
// extends global PageController class
//namespace Site\Pages;

use SilverStripe\Control\Controller;
use SilverStripe\CMS\Controllers\ContentController;
use SilverStripe\ORM\FieldType\DBDatetime;
use SilverStripe\View\ArrayData;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\ORM\PaginatedList;
use SilverStripe\Forms\Form;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\FormAction;
use SilverStripe\Forms\RequiredFields;
use SilverStripe\Control\HTTPRequest;

class PageController extends ContentController
{
    private static $allowed_actions = [
        'SearchForm',
    ];

    private $site_message;
    private $search_term;

    public function index(HTTPRequest $request)
    {
        $search = $request->getVar('q');
        if ($search) {
            return $this->doSearch($search);
        }

        return $this->render();
    }

    public function SearchForm()
    {
        return Form::create(
            $this,
            __FUNCTION__,
            FieldList::create(
                TextField::create('q', 'Search ...')
            ),
            FieldList::create(
                FormAction::create(
                    'doSearch',
                    'Find it!'
                )
            ),
            RequiredFields::create(['q'])
        )->setFormMethod('POST');
    }

    public function doSearch($data)
    {
        $this->search_term = is_array($data) ? $data['q'] : $data;

        return $this->renderWith([__CLASS__.'_search', 'Page']);
    }

    public function SearchResults()
    {
        $term = $this->search_term;
        if(!$term) {
            return false;
        }

        $results = SiteTree::get()->filterAny([
            'Title:PartialMatch' => $term,
            'Content:PartialMatch' => $term,
        ])->sort('Created DESC');

        return ArrayData::create([
            'Title' => 'Search query "'.$term.'"',
            'Results' => PaginatedList::create($results),
        ]);
    }

    public function getParentRecursively()
    {
        return $this->Level(1);
    }

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

        return true;
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
