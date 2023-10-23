<?php

// vendor/silverstripe/errorpage/src/ErrorPage.php
// extends global Page class
//namespace App\Pages;

use DNADesign\Elemental\Models\ElementContent;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Control\Controller;
use SilverStripe\FontAwesome\FontAwesomeField;
use SilverStripe\GraphQL\Controller as GraphQLController;
use TractorCow\Fluent\Extension\FluentSiteTreeExtension;

/**
 * Class \Page
 *
 * @property bool $InheritSideBar
 * @property string $BlockIcon
 * @property int $SideBarID
 * @property int $ElementalAreaID
 * @method \SilverStripe\Widgets\Model\WidgetArea SideBar()
 * @method \DNADesign\Elemental\Models\ElementalArea ElementalArea()
 * @mixin \DNADesign\Elemental\Extensions\ElementalPageExtension
 * @mixin \A2nt\CMSNiceties\Widgets\WidgetPageExtension
 * @mixin \Sheadawson\Linkable\Extensions\LinkableDataExtension
 */
class Page extends SiteTree
{
    protected $_cached = [];
    private static $default_container_class = 'container';
    private static $db = [
        'BlockIcon' => 'Varchar(255)',
    ];

    private static $field_include = [
        'ElementalAreaID',
    ];

    public static function DefaultContainer()
    {
        return self::config()->get('default_container_class');
    }

    public function getSettingsFields()
    {
        $fields = parent::getSettingsFields();

        $fields->addFieldsToTab('Root.Icon', [
            FontAwesomeField::create('BlockIcon', 'Page link Icon'),
        ]);

        return $fields;
    }

    /*
     * Shows custom summary of the post, otherwise
     * Displays summary of the first content element
     */
    public function Summary($wordsToDisplay = 30)
    {
        if (isset($this->_cached['summary' . $wordsToDisplay])) {
            return $this->_cached['summary' . $wordsToDisplay];
        }

        $summary = $this->getField('Summary');
        if ($summary) {
            $this->_cached['summary' . $wordsToDisplay] = $summary;

            return $this->_cached['summary' . $wordsToDisplay];
        }

        $element = ElementContent::get()->filter([
            'ParentID' => $this->ElementalArea()->ID,
            'HTML:not' => [null],
        ])->first();

        if ($element) {
            $this->_cached['summary' . $wordsToDisplay] = $element->dbObject('HTML')->Summary($wordsToDisplay);

            return $this->_cached['summary' . $wordsToDisplay];
        }

        $content = $this->getField('Content');
        if ($content) {
            $this->_cached['summary' . $wordsToDisplay] = $this->dbObject('Content')->Summary($wordsToDisplay);

            return $this->_cached['summary' . $wordsToDisplay];
        }

        $this->_cached['summary' . $wordsToDisplay] = false;

        return $this->_cached['summary' . $wordsToDisplay];
    }

    public function CSSClass()
    {
        return str_replace(['\\'], '-', $this->getField('ClassName'));
    }

    // AJAX/GraphQL helper
    public function MainContent()
    {
        $object = $this;
        return isset($object->GraphQLContent) ? $object->GraphQLContent : null;
    }

    public function getRequestLink($action = null)
    {
        $curr = Controller::curr();
        if ($curr::class === GraphQLController::class) {
            $vars = json_decode($curr->getRequest()->getBody(), true)['variables'];
            if (isset($vars['url'])) {
                return $vars['url'];
            }
        }

        return null;
    }

    protected function onBeforeWrite()
    {
        parent::onBeforeWrite();

        if (class_exists(FluentSiteTreeExtension::class) && ! $this->isDraftedInLocale() && $this->isInDB()) {
            $elementalArea = $this->ElementalArea();

            $elementalAreaNew = $elementalArea->duplicate();
            $this->setField('ElementalAreaID', $elementalAreaNew->ID);
        }
    }
}
