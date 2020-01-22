<?php


namespace Site\Extensions;

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

            $params = array_merge([
                'feature=oembed',
                'wmode=transparent',
                'enablejsapi=1',
                'disablekb=1',
                'iv_load_policy=3',
                'modestbranding=1',
                'rel=0',
                'showinfo=0',
                'controls='.($this->owner->getField('Controls') ? '1': '0'),
            ], $params);

            if ($this->owner->getField('Autoplay')) {
                $params[] = 'autoplay=1';
            }

            if ($this->owner->getField('Loop')) {
                $params[] = 'loop=1';
            }

            $this->owner->EmbedHTML = preg_replace(
                '/src="([A-z0-9:\/\.]+)\??(.*?)"/',
                'src="https://www.youtube.com/embed/'.$videoID.'?' . implode('&', $params) . '"',
                $this->owner->EmbedHTML
            );
        }
    }

    public function onBeforeWrite()
    {
        parent::onBeforeWrite();
        $this->setEmbedParams();
    }
}
