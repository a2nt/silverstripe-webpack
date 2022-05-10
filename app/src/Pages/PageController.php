<?php

// vendor/silverstripe/errorpage/src/ErrorPageController.php
// extends global PageController class
//namespace App\Pages;

use A2nt\CMSNiceties\Templates\DeferredRequirements;
use A2nt\ElementalBasics\Models\TeamMember;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\ElementContent;
use DNADesign\ElementalUserForms\Control\ElementFormController;
use SilverStripe\CMS\Controllers\ContentController;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Control\Controller;
use SilverStripe\Control\Director;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Core\Config\Config;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\Form;
use SilverStripe\Forms\FormAction;
use SilverStripe\Forms\RequiredFields;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\FieldType\DBDatetime;
use SilverStripe\ORM\PaginatedList;
use SilverStripe\View\ArrayData;

/**
 * Class \PageController
 *
 * @property \Page dataRecord
 * @method \Page data()
 * @mixin \Page
 */
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

    public function index(HTTPRequest $request)
    {
        $search = $request->getVar('q');
        if ($search) {
            return $this->doSearch($search);
        }

        return $this->render();
    }

    public function setAction($action)
    {
        $this->action = $action;
    }

    public function ElementalArea()
    {
        if (! $this->getAction() || 'index' === $this->getAction()) {
            return ElementalArea::get()->byID($this->getField('ElementalAreaID'));
        }

        return false;
    }

    public function CurrentElement()
    {
        $controller_curr = Controller::curr();

        if (is_a($controller_curr, ElementFormController::class)) {
            return $controller_curr;
        }

        return false;
    }

    public function SearchForm(): Form
    {
        $config = $this->SiteConfig();

        $form = Form::create(
            $this,
            __FUNCTION__,
            FieldList::create(
                TextField::create('q', 'Search ...')
                    ->setAttribute('placeholder', 'Search ' . $config->getField('Title') . ' Website')
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
                        . '<span class="sr-only">Search</span>'
                    )
            ),
            RequiredFields::create(['q'])
        )->setFormMethod('POST');

        $form->setLegend('Search ' . $config->getField('Title') . ' Website');

        return $form;
    }

    public function doSearch($data)
    {
        $this->search_term = is_array($data) ? $data['q'] : $data;

        return $this->renderWith([__CLASS__ . '_search', 'Page']);
    }

    public function SearchResults()
    {
        $term = $this->search_term;
        if (! $term) {
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
            if (! $page) {
                continue;
            }

            $results->push($page);
        }

        // get pages by objects
        $elements = self::getSearchObjects(
            self::config()->get('searchable_objects'),
            $term
        );

        foreach ($elements as $element) {
            $page = $element->Page();
            if (! $page) {
                continue;
            }

            $results->push($page);
        }

        $results->removeDuplicates();

        return ArrayData::create([
            'Title' => 'You searched for: "' . $term . '"',
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

        if ($request->isGET() && ! $this->site_message) {
            $session = $request->getSession();
            $this->site_message = $session->get('SiteWideMessage');
            $session->clear('SiteWideMessage');
        }

        return $this->site_message;
    }

    public static function DefaultContainer()
    {
        return \Page::DefaultContainer();
    }

    public function CurrentTime()
    {
        return DBDatetime::now();
    }

    public function isDev()
    {
        return Director::isDev();
    }

    protected function init()
    {
        DeferredRequirements::Auto();

        return parent::init();
    }

    private static function getSearchObjects($classNames, $term): ArrayList
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
}
