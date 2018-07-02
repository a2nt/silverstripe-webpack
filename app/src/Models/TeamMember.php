<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/30/18
 * Time: 11:36 PM
 */

namespace Site\Models;


use SilverStripe\Assets\Image;
use SilverStripe\ORM\DataObject;
use SilverStripe\Versioned\Versioned;
use Site\Extensions\SocialExtension;
use Site\Pages\TeamPage;

class TeamMember extends DataObject
{
    private static $table_name = 'TeamMember';

    private static $db = [
        'FirstName' => 'Varchar(254)',
        'LastName' => 'Varchar(254)',
        'Company' => 'Varchar(254)',
        'Position' => 'Varchar(254)',
    ];

    private static $has_one = [
        'Photo' => Image::class,
        'Page' => TeamPage::class,
    ];

    private static $extensions = [
        SocialExtension::class,
        Versioned::class,
    ];

    private static $owns = [
        'Photo',
    ];

    private static $summary_fields = [
        'Company',
        'FirstName',
        'LastName',
        'Position',
    ];

    public function getTitle()
    {
        return $this->getField('Company').' | '.$this->getField('FirstName').' '.$this->getField('LastName');
    }
}