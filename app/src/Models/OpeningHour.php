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

class OpeningHour extends DataObject
{
    private static $table_name = 'OpeningHour';

    private static $db = [
        'Day' => 'Enum("Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday", "Monday")',
        'From' => 'Time',
        'Till' => 'Time',
        'Comment' => 'Varchar(255)',
        'DisplayStart' => 'Date',
        'DisplayEnd' => 'Date',
    ];

    private static $has_one = [
        'Parent' => SiteConfig::class,
    ];

    private static $defaults = [
        'Day' => 'Monday',
        'From' => '09:00:00',
        'Till' => '22:00:00',
    ];

    private static $summary_fields = [
        'Day' => 'Day *',
        'From' => 'From *',
        'Till' => 'Till *',
        //'Comment' => 'Comment',
        'DisplayStart' => 'Display Start',
        'DisplayEnd' => 'Display End',
    ];

    private static $default_sort = 'Day ASC, From ASC';

    public function validate()
    {
        $result = parent::validate();


        if (!$this->getField('Day')
            || !$this->getField('From')
            || !$this->getField('Till')
            || $this->getField('From') > $this->getField('Till')
        ) {
            return $result->addError(
                'Day, From and Till fields are required or wrong time range was specified.',
                ValidationResult::TYPE_ERROR
            );
        }

        $exists = self::get()->filter([
            'ID:not' => $this->ID,
            'ParentID' => $this->getField('ParentID'),
            'Day' => $this->getField('Day'),
            'From:GreaterThanOrEqual' => $this->getField('From'),
            'Till:LessThanOrEqual' => $this->getField('Till'),
        ])->exists();

        if ($exists) {
            return $result->addError(
                'Hours were defined already for specified range.',
                ValidationResult::TYPE_ERROR
            );
        }

        return $result;
    }

    public function forTemplate()
    {
        return $this->renderWith(__CLASS__);
    }
}
