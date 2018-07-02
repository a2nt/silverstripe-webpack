<?php

namespace Site\Extensions;

use SilverStripe\ORM\DataExtension;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TreeMultiselectField;
use Sheadawson\Linkable\Models\Link;
use SilverStripe\Forms\TextField;
use Sheadawson\Linkable\Forms\LinkField;

class SiteTreeExtension extends DataExtension
{
    private static $db = [
        'ExtraCode' => 'Text',
    ];

    public function updateCMSFields(FieldList $fields)
    {
        $tab = $fields->findOrMakeTab('Root.Settings');

        $tab->push(Textarea::create(
            'ExtraCode',
            'Extra page specific HTML code'
        ));
    }
}
