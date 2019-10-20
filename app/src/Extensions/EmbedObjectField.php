<?php


namespace Site\Extensions;


use Sheadawson\Linkable\Forms\EmbeddedObjectField;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\ORM\FieldType\DBHTMLText;

class EmbedObjectField extends EmbeddedObjectField
{
    /**
     * @param array $properties
     * @return mixed|DBHTMLText
     */
    public function FieldHolder($properties = [])
    {
        $name = $this->getName();

        $fields = [
            CheckboxField::create(
                $name . '[autoplay]',
                _t(self::CLASS.'AUTOPLAY', 'Autoplay video?')
            )->setValue($this->object->getField('Autoplay')),

            CheckboxField::create(
                $name . '[loop]',
                _t(self::CLASS.'LOOP', 'Loop video?')
            )->setValue($this->object->getField('Loop')),

            CheckboxField::create(
                $name.'[controls]',
                _t(self::CLASS.'CONTROLS', 'Show player controls?')
            )->setValue($this->object->getField('Controls'))
        ];

        return CompositeField::create(array_merge([
            LiteralField::create(
                $name.'Options',
                parent::FieldHolder($properties)
            )
        ], $fields));
    }
}