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
    'strong[class|style]/b,em[class|style]/i,a[href|target=_blank|style],p[class|style]/div,br,span[class|style],' .
    'blockquote[class|style],' .
    'h2[class|style],h3[class|style],h4[class|style],h5[class|style],h6[class|style],'.
    'address[class|style],pre[class|style],hr,'.
    'a[href|rel|title|target|class|style],'.
    'table[class|style],ul[class|style],ol[start|type|class|style],li[class|style],'.
    'img[class|style|src|alt|title|hspace|vspace|width|height|align|name|usemap|data*],' .
    'iframe[class|style|src|name|width|height|align|frameborder|marginwidth|marginheight|scrolling],' .
    'object[class|style|width|height|data|type],' .
    'embed[class|style|src|type|pluginspage|width|height|autoplay],' .
    'param[class|style|name|value],' .
    'map[class|style|name|id],' .
    'area[class|style|shape|coords|href|target|alt]'
);
