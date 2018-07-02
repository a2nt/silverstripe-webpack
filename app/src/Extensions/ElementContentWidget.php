<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/24/18
 * Time: 2:35 PM
 */

namespace Site\Extensions;


use Sheadawson\Linkable\Forms\LinkField;
use Sheadawson\Linkable\Models\Link;
use SilverStripe\FontAwesome\FontAwesomeField;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataExtension;

class ElementContentWidget extends DataExtension
{
    private static $db = [
        'BlockIcon' => 'Varchar(255)',
    ];

    private static $has_one = [
        'BlockLink' => Link::class,
    ];

    public function updateCMSFields(FieldList $fields)
    {
        parent::updateCMSFields($fields);

        $tab = $fields->findOrMakeTab('Root.Main');
        $tab->push(
            FontAwesomeField::create('BlockIcon')
        );

        $tab->push(
            LinkField::create('BlockLinkID', 'Link')
        );
    }
}