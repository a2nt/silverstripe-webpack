<?php

namespace Site\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextField;

class UserFormExtension extends Extension
{
    public function updateFormFields(FieldList $fields)
    {
        foreach ($fields as $field) {
            $this->setPlaceholder($field);
        }
    }

    private function setPlaceholder($field)
    {
        if(is_a($field, TextField::class)) {
            $field->setAttribute(
                'placeholder',
                $field->Title()
                .($field->hasClass('requiredField') ? '*' : '')
            );
            $field->setTitle('');
        }

        if(is_a($field, CompositeField::class)) {
            $children = $field->getChildren();
            foreach ($children as $child) {
                $this->setPlaceholder($child);
            }
        }
    }
}
