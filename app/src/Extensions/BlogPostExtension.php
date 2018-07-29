<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 7/2/18
 * Time: 12:10 AM
 */

namespace Site\Extensions;

use DNADesign\Elemental\Models\ElementContent;
use SilverStripe\ORM\DataExtension;

class BlogPostExtension extends DataExtension
{
    /*
     * Shows custom summary of the post, otherwise
     * Displays summary of the first content element
     */
    public function Summary($wordsToDisplay = 30)
    {
        $summary = $this->owner->getField('Summary');
        if ($summary) {
            return $summary;
        }

        $element = ElementContent::get()->filter([
            'ParentID' => $this->owner->ElementalArea()->ID,
            'HTML:not' => [null],
        ])->first();

        if ($element) {
            return $element->dbObject('HTML')->Summary($wordsToDisplay);
        }

        return false;
    }
}
