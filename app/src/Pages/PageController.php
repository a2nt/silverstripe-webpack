<?php

// vendor/silverstripe/errorpage/src/ErrorPageController.php
// extends global PageController class
//namespace Site\Pages;

use SilverStripe\Control\Controller;
use SilverStripe\CMS\Controllers\ContentController;
use SilverStripe\Control\Director;
use SilverStripe\Core\Config\Config;
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
use SilverStripe\ORM\ArrayList;
use DNADesign\Elemental\Models\ElementContent;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\ElementalUserForms\Control\ElementFormController;
use Site\Models\TeamMember;
use Site\Templates\DeferredRequirements;

class PageController extends ContentController
{
    private static $allowed_actions = [
        'SearchForm',
    ];

    private static $searchable_elements = [
        ElementContent::class,
    ];

    private static $searchable_objects = [
        TeamMember::class,
    ];

    private $site_message;
    private $search_term;

    protected function init()
    {
        DeferredRequirements::Auto();

        return parent::init();
    }

    public function index(HTTPRequest $request)
    {
        $search = $request->getVar('q');
        if ($search) {
            return $this->doSearch($search);
        }

        return $this->render();
    }

    public function ElementalArea()
    {
        if ($this->CurrentElement() || $this->getAction() !== 'index') {
            return false;
        }

        return ElementalArea::get()->byID($this->getField('ElementalAreaID'));
    }

    public function CurrentElement()
    {
        $controller_curr = Controller::curr();

        if (is_a($controller_curr, ElementFormController::class)) {
            return $controller_curr;
        }

        return false;
    }

    public function SearchForm()
    {
        $config = $this->SiteConfig();
        return Form::create(
            $this,
            __FUNCTION__,
            FieldList::create(
                TextField::create('q', 'Search ...')
                ->setAttribute('placeholder', 'Search '.$config->getField('Title').' Website')
            ),
            FieldList::create(
                FormAction::create(
                    'doSearch',
                    'Find it!'
                )
                    ->setUseButtonTag(true)
                    ->addExtraClass('btn-secondary')
                    ->setButtonContent(
                        '<i class="fas fa-search"></i>'
                        .'<span class="sr-only">Search</span>'
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

    private static function getSearchObjects($classNames, $term)
    {
        $elements = ArrayList::create();
        foreach ($classNames as $class) {
            $fields = Config::inst()->get($class, 'frontend_searchable_fields');
            $find = array_combine($fields, $fields);
            $find = array_map(static function () use ($term) {
                return $term;
            }, $find);

            $elements->merge($class::get()->filterAny($find)->sort('Created DESC'));
        }

        return $elements;
    }

    public function SearchResults()
    {
        $term = $this->search_term;
        if (!$term) {
            return false;
        }

        $results = ArrayList::create();

        // get pages by title and content
        $pages = SiteTree::get()->filterAny([
            'Title:PartialMatch' => $term,
            'Content:PartialMatch' => $term,
        ])->sort('Created DESC');

        $results->merge($pages);

        // get pages by elements
        $elements = self::getSearchObjects(
            self::config()->get('searchable_elements'),
            $term
        );

        foreach ($elements as $element) {
            $page = Page::get()->filter('ElementalAreaID', $element->getField('ParentID'))->first();
            if (!$page) {
                continue;
            }

            $results->push($page);
        }

        // get pages by onjects
        $elements = self::getSearchObjects(
            self::config()->get('searchable_objects'),
            $term
        );

        foreach ($elements as $element) {
            $page = $element->Page();
            if (!$page) {
                continue;
            }

            $results->push($page);
        }

        $results->removeDuplicates();

        return ArrayData::create([
            'Title' => 'You searched for: "'.$term.'"',
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
        $request = $this->getRequest();

        if ($request->isGET() && !$this->site_message) {
            $session = $request->getSession();
            $this->site_message = $session->get('SiteWideMessage');
            $session->clear('SiteWideMessage');
        }

        return $this->site_message;
    }

    public function CurrentTime()
    {
        return DBDatetime::now();
    }

    public function isDev()
    {
        return Director::isDev();
    }
}
