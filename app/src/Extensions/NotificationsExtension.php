<?php

namespace Site\Extensions;

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
use SilverStripe\Forms\GridField\GridFieldDetailForm;
use SilverStripe\Forms\GridField\GridFieldEditButton;
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
use Site\Models\Holiday;
use Site\Models\Notification;
use Site\Models\OpeningHour;
use Symbiote\GridFieldExtensions\GridFieldAddNewInlineButton;
use Symbiote\GridFieldExtensions\GridFieldEditableColumns;
use Symbiote\GridFieldExtensions\GridFieldTitleHeader;

class NotificationsExtension extends DataExtension
{
    private static $db = [
        'ShowNotifications' => 'Boolean(1)',
    ];

    private static $has_many = [
        'Notifications' => Notification::class,
    ];

    public function updateCMSFields(FieldList $fields)
    {
        $tab = $fields->findOrMakeTab('Root.Notifications');

        if(!$this->owner->exists()) {
            $tab->push(LiteralField::create(
                'NotificationsNotice',
                '<p class="message notice">The object must be saved before notifications can be added</p>'
            ));

            return null;
        }

        $items = $this->owner->Notifications();

        $config = GridFieldConfig::create();
        $config->addComponents([
            new GridFieldToolbarHeader(),
            new GridFieldTitleHeader(),
            new GridFieldEditableColumns(),
            new GridFieldAddNewInlineButton('toolbar-header-right'),
            new GridFieldDetailForm(),
            new GridFieldEditButton(),
            new GridFieldDeleteAction(),
        ]);

        $tab->setChildren(FieldList::create(
            HeaderField::create('NotificationsHeader','Notifications'),
            LiteralField::create(
                'CurrentNotifications',
                '<b>Current:</b>'
                .$this->owner->renderWith('Site\\Objects\\NotificationsList')
            ),
            CheckboxField::create('ShowNotifications'),
            GridField::create(
                'Notifications',
                '',
                $items,
                $config
            )
        ));
    }

    public function NotificationsToday()
    {
        $items = $this->owner->Notifications();
        $time = time();

        return $items->filter([
            'DateOn:LessThanOrEqual' => date('Y-m-d', $time),
            'DateOff:GreaterThanOrEqual' => date('Y-m-d', $time),
        ]);
    }
}
