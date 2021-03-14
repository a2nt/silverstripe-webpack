<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/30/18
 * Time: 11:54 PM
 */

namespace App\Elements;

use Sheadawson\Linkable\Forms\LinkField;
use Sheadawson\Linkable\Models\Link;
use SilverStripe\FontAwesome\FontAwesomeField;
use DNADesign\Elemental\Models\ElementContent;

class BlockElement extends ElementContent
{
    private static $singular_name = 'Block Element';

    private static $plural_name = 'Block Element';

    private static $description = 'Displays Block';

    private static $table_name = 'BlockElement';

    public function getType()
    {
        return self::$singular_name;
    }

    private static $db = [
        'BlockIcon' => 'Varchar(255)',
    ];

    private static $has_one = [
        'BlockLink' => Link::class,
    ];

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $fields->addFieldsToTab('Root.Main', [
            FontAwesomeField::create('BlockIcon'),
            LinkField::create('BlockLinkID', 'Link'),
        ]);

        return $fields;
    }
}
