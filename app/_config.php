<?php

use SilverStripe\Forms\HTMLEditor\HtmlEditorConfig;
use SilverStripe\Core\Manifest\ModuleResourceLoader;
use SilverStripe\ORM\Search\FulltextSearchable;

HtmlEditorConfig::get('cms')->enablePlugins([
    'template',
    'fullscreen',
    'hr',
    'contextmenu',
    'charmap',
    'visualblocks',
    'lists',
    'anchor',
    'charcount' => ModuleResourceLoader::resourceURL(
        'drmartingonzo/ss-tinymce-charcount:client/dist/js/bundle.js'
    ),
]);

HtmlEditorConfig::get('cms')->insertButtonsAfter('sslink', 'anchor');
FulltextSearchable::enable();
