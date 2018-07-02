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
use SilverStripe\UserForms\Model\UserDefinedForm;

class SocialExtension extends DataExtension
{
    private static $db = [
        'Address' => 'Varchar(255)',
    ];

    private static $has_one = [
        'Facebook' => Link::class,
        'LinkedIn' => Link::class,
        'GooglePlus' => Link::class,
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
            LinkField::create('GooglePlusID'),
            LinkField::create('InstagramID'),
            LinkField::create('TwitterID'),
        ];

        foreach ($linkFields as $field) {
            $field->setAllowedTypes(['URL']);
        }

        $fields->findOrMakeTab('Root.Social');
UserDefinedForm::
        $fields->addFieldsToTab('Root.Social', [
            LinkField::create('PublicEmailID', 'Public Email')
                ->setAllowedTypes(['Email']),
            LinkField::create('PhoneNumberID', 'Phone Number')
                ->setAllowedTypes(['Phone']),
            TextField::create('Address'),
        ]);

        $fields->addFieldsToTab('Root.Social', $linkFields);
    }
}