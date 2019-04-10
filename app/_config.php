<?php

use SilverStripe\Forms\HTMLEditor\HtmlEditorConfig;
use SilverStripe\Core\Manifest\ModuleResourceLoader;
use SilverStripe\ORM\Search\FulltextSearchable;

$config = HtmlEditorConfig::get('cms');
$config->enablePlugins([
    'template',
    'fullscreen',
    'hr',
    'contextmenu',
    'charmap',
    'visualblocks',
    'lists',
    'charcount' => ModuleResourceLoader::resourceURL(
        'drmartingonzo/ss-tinymce-charcount:client/dist/js/bundle.js'
    ),
]);
$config->addButtonsToLine(2, 'hr');
$config->setOption('block_formats', 'Paragraph=p;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Address=address;Pre=pre');
$config->setOption('invalid_elements', 'h1');
$config->setOption(
    'table_class_list',
    [
        ['title' => 'Transparent Table', 'value' => 'table-none'],
        ['title' => 'Shaded rows', 'value' => 'table table-striped table-bordered'],
    ]
);

FulltextSearchable::enable();
