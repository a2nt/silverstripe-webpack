<?php

// vendor/silverstripe/errorpage/src/ErrorPage.php
// extends global Page class
//namespace Site\Pages;

use SilverStripe\CMS\Model\SiteTree;
use DNADesign\Elemental\Models\ElementContent;

class Page extends SiteTree
{
    private static $default_container_class = 'container';
    protected $_cached = [];

    public static function DefaultContainer()
    {
        return self::config()->get('default_container_class');
    }

    /*
     * Shows custom summary of the post, otherwise
     * Displays summary of the first content element
     */
    public function Summary($wordsToDisplay = 30)
    {
        if (isset($this->_cached['summary'.$wordsToDisplay])) {
            return $this->_cached['summary'.$wordsToDisplay];
        }

        $summary = $this->getField('Summary');
        if ($summary) {
            $this->_cached['summary'.$wordsToDisplay] = $summary;
            return $this->_cached['summary'.$wordsToDisplay];
        }

        $element = ElementContent::get()->filter([
            'ParentID' => $this->ElementalArea()->ID,
            'HTML:not' => [null],
        ])->first();

        if ($element) {
            $this->_cached['summary'.$wordsToDisplay] = $element->dbObject('HTML')->Summary($wordsToDisplay);
            return $this->_cached['summary'.$wordsToDisplay];
        }

        $this->_cached['summary'.$wordsToDisplay] = false;
        return $this->_cached['summary'.$wordsToDisplay];
    }

    public function CSSClass()
    {
        return str_replace(['\\'], '-', $this->getField('ClassName'));
    }
}
