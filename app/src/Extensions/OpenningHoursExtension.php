<?php

namespace App\Extensions;

use Dynamic\Elements\Blog\Elements\ElementBlogPosts;
use Innoweb\Sitemap\Pages\SitemapPage;
use Sheadawson\Linkable\Forms\LinkField;
use Sheadawson\Linkable\Models\Link;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig;
use SilverStripe\Forms\GridField\GridFieldDeleteAction;
use SilverStripe\Forms\GridField\GridFieldToolbarHeader;
use SilverStripe\Forms\HeaderField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\DataExtension;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TreeMultiselectField;
use BetterBrief\GoogleMapField;
use App\Models\Holiday;
use App\Models\OpeningHour;
use Symbiote\GridFieldExtensions\GridFieldAddNewInlineButton;
use Symbiote\GridFieldExtensions\GridFieldEditableColumns;
use Symbiote\GridFieldExtensions\GridFieldTitleHeader;

class OpenningHoursExtension extends DataExtension
{
    private static $db = [
        'ShowOpeningHours' => 'Boolean(1)',
        'OpenningHoursNote' => 'Varchar(255)',
    ];

    private static $has_one = [
        'OpeningHoursPage' => SiteTree::class,
    ];

    private static $has_many = [
        'OpeningHours' => OpeningHour::class,
        'Holidays' => Holiday::class,
    ];

    public function HoursLink()
    {
        return $this->owner->OpeningHoursPage()->Link();
    }

    public function updateCMSFields(FieldList $fields)
    {
        $tab = $fields->findOrMakeTab('Root.OpeningHours');

        if(!$this->owner->exists()) {
            $tab->push(LiteralField::create(
                'OpeningHoursNotice',
                '<p class="message notice">The object must be saved before opening hours can be added</p>'
            ));

            return null;
        }

        $hours = $this->owner->OpeningHours();

        $config = GridFieldConfig::create();
        $config->addComponents([
            new GridFieldToolbarHeader(),
            new GridFieldTitleHeader(),
            new GridFieldEditableColumns(),
            new GridFieldAddNewInlineButton('toolbar-header-right'),
            new GridFieldDeleteAction(),
        ]);

        $tab->setChildren(FieldList::create(
            HeaderField::create('OpeningHours','Opening Hours'),
            LiteralField::create(
                'CurrentOpeningHour',
                '<b>Today:</b>'
                .'<p class="message notice">'
                .$this->owner->renderWith('App\\Objects\\OpeningHoursList')
                .'</p>'
            ),
            CheckboxField::create('ShowOpeningHours'),
            DropdownField::create(
                'OpeningHoursPageID',
                'Opening Hours Page',
                SiteTree::get()->map()->toArray()
            ),
            /*TextareaField::create('OpenningHoursNote'),
            LiteralField::create(
                'OpeningHoursNote',
                '<p><b>Please, specify time ranges. For example:</b><br/>'
                .'Monday 10:00 AM - 2:00 PM<br/>'
                .'Monday 3:00 PM - 6:00 PM<br/>'
                .'Tuesday 12:00 AM - 2:00 PM<br/>'
                .'Tuesday 3:00 PM - 4:00 PM<br/>'
                .'...<br/>'
                .'<b>Short day example durring holidays:</b><br/>'
                .'Monday 12:00 AM - 2:00 PM 12/31/2018 - 01/06/2019'
                .'</p>'
            ),*/
            GridField::create(
                'OpeningHours',
                'Opening Hours',
                $hours,
                $config
            )
        ));

        $tab = $fields->findOrMakeTab('Root.Holidays');
        $tab->push(GridField::create(
            'Holidays',
            'Holidays',
            $this->owner->Holidays(),
            $config
        ));
    }

    /**
     * Get the opening hours
     *
     * @return OpeningHour|DataObject|null
     */
    public function OpeningHoursToday()
    {
        $hours = $this->owner->OpeningHours();
        $time = time();

        $today = $hours->filter([
            'Day' => date('l', $time),
            'DisplayStart:LessThanOrEqual' => date('Y-m-d', $time),
            'DisplayEnd:GreaterThanOrEqual' => date('Y-m-d', $time),
        ]);

        return $today->exists() ? $today : $hours->filter([
            'Day' => date('l', $time),
            'DisplayStart' => null,
            'DisplayEnd' => null,
        ]);
    }

    public function OpeningHoursJSON()
    {
        $hours = $this->owner->OpeningHours();
        $result = [];
        foreach ($hours as $hour) {
            $from = str_replace(':00', '', date('g:i a', strtotime($hour->getField('From'))));
            $till = str_replace(':00', '', date('g:i a', strtotime($hour->getField('Till'))));

            $result['days'][$hour->getField('Day')][] = [
                'From' => $from,
                'Till' => $till,
                'DisplayStart' => $hour->getField('DisplayStart'),
                'DisplayEnd' => $hour->getField('DisplayEnd'),
            ];
        }

        $holidays = $this->owner->Holidays();
        foreach ($holidays as $holiday) {
            $result['holidays'][$holiday->getField('Date')] = $holiday->getField('Title');
        }

        return json_encode($result);
    }

    public function onBeforeWrite()
    {
        parent::onBeforeWrite();
        if ($this->owner->exists() && !$this->owner->OpeningHours()->exists()) {
            $this->createOpeningHours();
        }
    }

    /**
     * Set up the opening hours for each day of the week
     */
    private function createOpeningHours()
    {
        $days = OpeningHour::singleton()->dbObject('Day')->enumValues();
        foreach ($days as $day) {
            $openingHour = OpeningHour::create();
            $openingHour->Day = $day;
            $this->owner->OpeningHours()->add($openingHour);
        }
    }
}
