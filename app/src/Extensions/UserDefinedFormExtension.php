<?php

namespace Site\Extensions;

use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\GridField\GridFieldDataColumns;
use SilverStripe\Forms\GridField\GridFieldPaginator;
use SilverStripe\Forms\ListboxField;
use SilverStripe\Forms\TextareaField;
use SilverStripe\ORM\DataExtension;
use SilverStripe\UserForms\Model\EditableFormField;

class UserDefinedFormExtension extends DataExtension
{
    private static $db = [
        'CustomThankYouCode' => 'HTMLText',
        'RedirectOnComplete' => 'Boolean(0)',
        'RedirectOnCompleteURL' => 'Varchar(255)',
    ];

    private static $many_many = [
        'SubmissionColumns' => EditableFormField::class,
    ];

    public function updateCMSFields(FieldList $fields)
    {
        parent::updateCMSFields($fields);

        $fields->removeByName('RedirectOnComplete');
        $fields->removeByName('RedirectOnCompleteURL');

        $fields->removeByName('SubmissionColumns');

        $fields->addFieldToTab(
            'Root.Main',
            ListboxField::create(
                'SubmissionColumns',
                'Display following columns at submissions list',
                $this->owner->Fields()->map('ID', 'Title')
            )
        );

        $tab = $fields->findOrMakeTab('Root.FormOptions');

        /*$tab->push(CheckboxField::create('RedirectOnComplete'));
        $tab->push(TextField::create('RedirectOnCompleteURL'));*/
        $tab->push(TextareaField::create('CustomThankYouCode'));

        $grid = $fields->dataFieldByName('Submissions');

        $config = $grid->getConfig();
        $config->getComponentByType(GridFieldPaginator::class)->setItemsPerPage(100);

        $cols = $this->owner->SubmissionColumns();
        if ($grid && $cols->count()) {
            $dataCols = $config->getComponentByType(GridFieldDataColumns::class);

            $columns = [
                'ID' => 'ID',
                'Created' => 'Created',
            ];

            foreach ($cols as $col) {
                $title = $col->getField('Title');
                $name = $col->getField('Name');
                $columns[$name] = [
                    'title' => $title,
                    'callback' => function($item) use ($name) {
                        return $item->relField($name);
                    }
                ];
            }

            $columns['Actions'] = 'Actions';

            $dataCols->setDisplayFields($columns);
        }
    }
}
