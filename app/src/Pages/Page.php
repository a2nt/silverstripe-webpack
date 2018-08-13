<?php

// vendor/silverstripe/errorpage/src/ErrorPage.php
// extends global Page class
//namespace Site\Pages;

use SilverStripe\CMS\Model\SiteTree;
use DNADesign\Elemental\Models\ElementContent;

class Page extends SiteTree
{
    /*
     * Shows custom summary of the post, otherwise
     * Displays summary of the first content element
     */
    public function Summary($wordsToDisplay = 30)
    {
        $summary = $this->getField('Summary');
        if ($summary) {
            return $summary;
        }

        $element = ElementContent::get()->filter([
            'ParentID' => $this->ElementalArea()->ID,
            'HTML:not' => [null],
        ])->first();

        if ($element) {
            return $element->dbObject('HTML')->Summary($wordsToDisplay);
        }

        return false;
    }
}
