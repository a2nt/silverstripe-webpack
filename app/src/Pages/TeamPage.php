<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/30/18
 * Time: 11:46 PM
 */

namespace Site\Pages;

use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;
use Site\Models\TeamMember;

class TeamPage extends \Page
{
    private static $icon_class = 'font-icon-p-profile';

    private static $has_many = [
        'Members' => TeamMember::class,
    ];

    private static $owns = [
        'Members',
    ];

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $fields->addFieldToTab(
            'Root.Members',
            GridField::create(
                'Members',
                '',
                $this->Members(),
                GridFieldConfig_RecordEditor::create()
            )
        );

        return $fields;
    }
}
