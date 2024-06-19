<?php

// vendor/silverstripe/errorpage/src/ErrorPageController.php
// extends global PageController class
//namespace App\Pages;

use SilverStripe\Control\Middleware\HTTPCacheControlMiddleware;
use A2nt\CMSNiceties\Ajax\Ex\AjaxControllerEx;
use SilverStripe\CMS\Controllers\ContentController;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Control\Controller;
use SilverStripe\Control\Director;
use SilverStripe\View\SSViewer;

/**
 * Class \PageController
 *
 * @property \Page $dataRecord
 * @method \Page data()
 * @mixin \Page
 * @mixin \A2nt\CMSNiceties\Extensions\PageControllerEx
 * @mixin \A2nt\CMSNiceties\Ajax\Ex\AjaxControllerEx
 */
class PageController extends ContentController
{
    private static $graphql_resources = [];
    private static $ajax_resources = [];

    protected function init()
    {
        HTTPCacheControlMiddleware::singleton()
            ->enableCache()
            // 1 minute
            ->setMaxAge(60);

        return parent::init();
    }

    public function ElementalArea()
    {
        return $this->dataRecord->ElementalArea();
    }

    public function getViewer($action)
    {
        // Manually set templates should be dealt with by Controller::getViewer()
        if (!empty($this->templates[$action])
            || !empty($this->templates['index'])
            || $this->template
        ) {
            return parent::getViewer($action);
        }

        // Prepare action for template search
        $action = $action === 'index' ? '' : '_' . $action;

        $templatesFound = [];
        // Find templates for the record + action together - e.g. Page_action.ss
        if ($this->dataRecord instanceof SiteTree) {
            $templatesFound[] = $this->dataRecord->getViewerTemplates($action);
        }

        // Find templates for the controller + action together - e.g. PageController_action.ss
        $templatesFound[] = SSViewer::get_templates_by_class(static::class, $action, Controller::class);

        // Find templates for the record without an action - e.g. Page.ss
        if ($this->dataRecord instanceof SiteTree) {
            $templatesFound[] = $this->dataRecord->getViewerTemplates();
        }

        // Find the templates for the controller without an action - e.g. PageController.ss
        $templatesFound[] = SSViewer::get_templates_by_class(static::class, "", Controller::class);

        $tpls = array_merge(...$templatesFound);

        // inject AJAX processing
        if (Director::is_ajax()) {
            HTTPCacheControlMiddleware::singleton()
                ->disableCache();

            return AjaxControllerEx::processAJAX($tpls);
        }

        return SSViewer::create($tpls);
    }

    protected function prepareResponse($response)
    {
        parent::prepareResponse($response);

        // inject AJAX processing
        if (Director::is_ajax()) {
            $response = $this->getResponse();
            $this->prepareAjaxResponse($response);
        }
    }
}
