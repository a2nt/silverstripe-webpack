<?php


namespace Site\Extensions;

use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\NumericField;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\DataExtension;

class EmbeddedObjectExtension extends DataExtension
{
    private static $db = [
        'Autoplay' => 'Boolean(0)',
        'Loop' => 'Boolean(0)',
        'Controls' => 'Boolean(1)',
    ];

    public function Embed()
    {
        $this->owner->Embed();
        $this->setEmbedParams();

        return $this->owner;
    }

    public function setEmbedParams($params = [])
    {
        // YouTube params
        if (stripos($this->owner->EmbedHTML, 'https://www.youtube.com/embed/') > 0) {
            $url = $this->owner->getField('SourceURL');
            preg_match(
                '/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&"\'>]+)/',
                $url,
                $matches
            );
            $videoID = $matches[1];

            $params = array_merge($params, [
                'feature=oembed',
                'wmode=transparent',
                'enablejsapi=1',
                'disablekb=1',
                'iv_load_policy=3',
                'modestbranding=1',
                'rel=0',
                'showinfo=0',
                //'controls='.($this->owner->getField('Controls') ? '1': '0')
            ]);

            if ($this->owner->getField('Autoplay')) {
                $params[] = 'autoplay=1';
            }

            if ($this->owner->getField('Loop')) {
                $params[] = 'loop=1';
                $params[] = 'playlist='.$videoID;
            }

            $this->owner->EmbedHTML = preg_replace(
                '/src="([A-z0-9:\/\.]+)\??(.*?)"/',
                'src="https://www.youtube.com/embed/'.$videoID.'?' . implode('&', $params) . '"',
                $this->owner->EmbedHTML
            );
        }

        if (stripos($this->owner->EmbedHTML, 'https://player.vimeo.com/video/') > 0) {
             $url = $this->owner->getField('SourceURL');
            preg_match(
                '/^https:\/\/vimeo\.com\/([A-z0-9]+)/',
                $url,
                $matches
            );
            $videoID = $matches[1];

            $params = array_merge($params, [
                'controls='.($this->owner->getField('Controls') ? '1': '0'),
                'background=1',
            ]);

            if ($this->owner->getField('Autoplay')) {
                $params[] = 'autoplay=1';
            }

            if ($this->owner->getField('Loop')) {
                $params[] = 'loop=1';
            }
            $this->owner->EmbedHTML = preg_replace(
                '/src="([A-z0-9:\/\.]+)\??(.*?)"/',
                'src="https://player.vimeo.com/video/'.$videoID.'?' . implode('&', $params) . '"',
                $this->owner->EmbedHTML
            );
        }
    }

    public function updateCMSFields(FieldList $fields)
    {
        parent::updateCMSFields($fields);

        $fields->removeByName([
            'Width', 'Height', 'EmbedHTML', 'ThumbURL',
            'Autoplay', 'Loop', 'Controls',
            'ExtraClass', 'Type',
        ]);

        $fields->addFieldsToTab('Root.Extra', [
            CheckboxField::create('Autoplay'),
            CheckboxField::create('Loop'),
            CheckboxField::create('Controls'),
            NumericField::create('Width'),
            NumericField::create('Height'),
            TextareaField::create('EmbedHTML'),
            TextField::create('ThumbURL'),
            TextField::create('ExtraClass'),
            TextField::create('Type'),
        ]);
    }

    public function onBeforeWrite()
    {
        parent::onBeforeWrite();
        $this->setEmbedParams();
    }
}
