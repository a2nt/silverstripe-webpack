<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/30/18
 * Time: 11:54 PM
 */

namespace Site\Elements;


use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Core\Convert;

class InstagramElement extends BaseElement
{
    private static $singular_name = 'Instagram';

    private static $plural_name = 'Instagram Elements';

    private static $description = 'Displays Instagram posts';

    private static $table_name = 'InstagramElement';

    private static $db = [
        'Username' => 'Varchar(255)',
	    'Tag' => 'Varchar(255)',
	    'DisplayProfile' => 'Boolean(0)',
	    'DisplayBiography' => 'Boolean(0)',
	    'DisplayGallery' => 'Boolean(0)',
	    'DisplayCaptions' => 'Boolean(0)',
    ];

    private static $defaults = [
    	'DisplayGallery' => true,
    ];

    public function getType()
    {
        return self::$singular_name;
    }

    /**
     * @return array
     */
    public function getAttributes(): array
    {
    	return [
			'data-username' => $this->Username,
		    'data-display-profile' => $this->DisplayProfile,
		    'data-display-biography' => $this->DisplayBiography,
			'data-display-gallery' => $this->DisplayGallery,
			'data-display-captions' => $this->DisplayCaptions,
		    'data-items' => 12,
	    ];
    }
    /**
     * Custom attributes to process.
     *
     * @param array $attributes
     *
     * @return string
     */
    public function AttributesHTML($attributes = null): string
    {
    	if (!$attributes) {
            $attributes = $this->getAttributes();
        }

        $attributes = (array) $attributes;

        $attributes = array_filter($attributes, static function ($v) {
            return ($v || $v === 0 || $v === '0');
        });

        // Create markup
        $parts = [];

        foreach ($attributes as $name => $value) {
            if ($value === true) {
                $value = $name;
            } else if (is_scalar($value)) {
                $value = (string) $value;
            } else {
                $value = json_encode($value);
            }

            $parts[] = sprintf('%s=%s', Convert::raw2att($name), Convert::raw2att($value));
        }

        return implode(' ', $parts);
    }

    public function FeedLink()
    {
	    return 'https://www.instagram.com/'.($this->Username ? $this->Username : 'explore/tags/'.$this->Tag).'/';
    }

    public function FeedTitle()
    {
    	return ($this->Username ? '@'.$this->Username : '#'.$this->Tag);
    }
}
