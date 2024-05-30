<?php

use SilverStripe\Forms\HTMLEditor\TinyMCEConfig;
use SilverStripe\Core\EnvironmentLoader;

$env = BASE_PATH . '/app/.env';
$loader = new EnvironmentLoader();
$loader->loadFile($env);
/*\SilverStripe\Core\Config\Config::modify()->set(
    \SilverStripe\Control\Email\Email::class,
    'bcc_all_emails_to',//'cc_all_emails_to',
    'test@example.com'
);*/


$cfg = TinyMCEConfig::get('cms');
$cfg->setOption('forced_root_block', 'p');
$cfg->setOption(
    'valid_elements',
    'strong/b,em/i,a[href|target=_blank],p/div,br,' .
    'blockquote,' .
    'img[class|src|alt|title|hspace|vspace|width|height|align|name|usemap|data*],' .
    'iframe[src|name|width|height|align|frameborder|marginwidth|marginheight|scrolling],' .
    'object[width|height|data|type],' .
    'embed[src|type|pluginspage|width|height|autoplay],' .
    'param[name|value],' .
    'map[class|name|id],' .
    'area[shape|coords|href|target|alt],' .
    'ol[start|type]'
);
