<?php

// vendor/silverstripe/errorpage/src/ErrorPageController.php
// extends global PageController class
//namespace App\Pages;
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
 */
class PageController extends ContentController
{
    private static $graphql_resources = [];
    private static $ajax_resources = [];

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
            return self::processAJAX($tpls);
        }

        return SSViewer::create($tpls);
    }

    protected static function processAJAX($tpls)
    {
        foreach ($tpls as $tpl) {
            if (is_array($tpl)) {
                continue;
            }

            $a_tpl = explode('\\', $tpl);
            $last_name = array_pop($a_tpl);
            $a_tpl[] = 'Layout';
            $a_tpl[] = $last_name;
            $a_tpl = implode('\\', $a_tpl);

            if (SSViewer::hasTemplate($a_tpl)) {
                $tpl = $a_tpl;
                break;
            }
        }
        //

        $tpl = is_array($tpl) ? 'Page' : $tpl;
        $tpl = ($tpl !== 'Page') ? $tpl : 'Layout/Page';

        return SSViewer::create($tpl);
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

    protected function prepareAjaxResponse($response)
    {
        $record = $this->dataRecord;

        $req = $this->getRequest();
        $url = $req->getURL();
        $url = $url === 'home' ? '/' : $url;

        $resources = array_merge(
            $this->config()->get('graphql_resources'),
            $this->config()->get('ajax_resources')
        );

        $response->setBody(json_encode([
            'ID' => $record->ID,
            'Title' => $record->Title,
            'Link' => $this->Link(),
            'CSSClass' => $this->CSSClass(),
            'Resources' => $resources,
            'RequestLink' => $url,
            'MainContent' => $response->getBody(),
        ]));
    }
}
