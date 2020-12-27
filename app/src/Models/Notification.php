<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 9/12/18
 * Time: 2:55 AM
 */

namespace Site\Models;

use Dynamic\FlexSlider\Model\SlideImage;
use Sheadawson\Linkable\Forms\LinkField;
use Sheadawson\Linkable\Models\Link;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\ValidationResult;
use SilverStripe\SiteConfig\SiteConfig;

class Notification extends DataObject
{
    private static $table_name = 'Notification';

    private static $db = [
        'Title' => 'Varchar(255)',
        'Content' => 'Text',
        'DateOn' => 'Date',
        'DateOff' => 'Date',
	    'Area' => 'Enum("Site","Site")',
    ];

    private static $has_one = [
        'Parent' => SiteConfig::class,
        'TargetLink' => Link::class,
    ];


    private static $summary_fields = [
        'Title' => 'Title',
        'Content' => 'Text',
        'DateOn' => 'Turn on date',
        'DateOff' => 'Turn off date',
    ];

    private static $default_sort = 'DateOn DESC, DateOff DESC, Title ASC';

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $fields->addFieldsToTab('Root.Main', [
            LinkField::create('TargetLinkID', 'Link'),
        ]);

        return $fields;
    }

    public function validate()
    {
        $result = parent::validate();

        if(!$this->getField('DateOn') || !$this->getField('DateOff')) {
            return $result->addError(
                'Turn on and turn off dates are required.',
                ValidationResult::TYPE_ERROR
            );
        }

        if(!$this->getField('Content')) {
            return $result->addError(
                'Text field required.',
                ValidationResult::TYPE_ERROR
            );
        }

        return $result;
    }
}
