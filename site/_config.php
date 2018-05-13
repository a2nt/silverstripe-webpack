<?php

use SilverStripe\Forms\HTMLEditor\HtmlEditorConfig;
use SilverStripe\Core\Manifest\ModuleResourceLoader;

HtmlEditorConfig::get('cms')->enablePlugins([
    'template',
    'fullscreen',
    'hr',
    'contextmenu',
    'charmap',
    'visualblocks',
    'lists',
    'charcount' => ModuleResourceLoader::resourceURL('drmartingonzo/ss-tinymce-charcount:client/dist/js/bundle.js'),
]);
