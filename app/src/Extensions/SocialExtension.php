<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/30/18
 * Time: 11:37 PM
 */

namespace Site\Extensions;

use Sheadawson\Linkable\Forms\LinkField;
use Sheadawson\Linkable\Models\Link;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\DataExtension;
use SilverStripe\Security\Member;

class SocialExtension extends DataExtension
{
    private static $db = [
        //'PhoneNumber' => 'Varchar(255)',
    ];

    private static $has_one = [
        'Facebook' => Link::class,
        'LinkedIn' => Link::class,
        'Pinterest' => Link::class,
        'Instagram' => Link::class,
        'Twitter' => Link::class,
        'PublicEmail' => Link::class,
        'PhoneNumber' => Link::class,
    ];

    public function updateCMSFields(FieldList $fields)
    {
        parent::updateCMSFields($fields);

        $linkFields = [
            LinkField::create('FacebookID'),
            LinkField::create('LinkedInID'),
            LinkField::create('PinterestID'),
            LinkField::create('InstagramID'),
            LinkField::create('TwitterID'),
        ];

        foreach ($linkFields as $field) {
            $field->setAllowedTypes(['URL']);
        }

        $fields->findOrMakeTab('Root.Social');

        $fields->addFieldsToTab('Root.Social', [
            LinkField::create('PublicEmailID', 'Public Email')
                ->setAllowedTypes(['Email']),
            LinkField::create('PhoneNumberID', 'Phone Number')
                ->setAllowedTypes(['Phone']),
        ]);

        $fields->addFieldsToTab('Root.Social', $linkFields);
    }

    public static function byPhone($phone)
    {
        $links = Link::get()->filter('Phone', $phone);

        if ($links->exists()) {
            return Member::get()->filter(
                'PhoneNumberID',
                array_keys($links->map('ID', 'Title')->toArray())
            )->first();
        }

        return null;
    }
}
