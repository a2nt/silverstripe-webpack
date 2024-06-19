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
$cfg->setOption('fix_list_elements', true);
$cfg->setOption('remove_trailing_brs', true);
$cfg->setOption('invalid_styles', 'font-family font'); //'color font-size width height'

$cfg->setOption(
    'valid_elements',
    'p/div,strong/b,em/i,'.
    'strong[class|style|id],em[class|style|id],a[href|target=_blank|style],p[class|style|id],br,span[class|style|id],' .
    'blockquote[class|style|id],' .
    'h2[class|style|id],h3[class|style|id],h4[class|style|id],h5[class|style|id],h6[class|style|id],'.
    'address[class|style|id],pre[class|style|id],hr,'.
    'a[href|rel|title|target|class|style|id],'.
    'table[class|style|id],ul[class|style|id],ol[start|type|class|style|id],li[class|style|id],'.
    'img[class|style|id|src|alt|title|hspace|vspace|width|height|align|name|usemap|data*],' .
    'iframe[class|style|id|src|name|width|height|align|frameborder|marginwidth|marginheight|scrolling],' .
    'object[class|style|id|width|height|data|type],' .
    'embed[class|style|id|src|type|pluginspage|width|height|autoplay],' .
    'param[class|style|id|name|value],' .
    'map[class|style|id|name|id],' .
    'area[class|style|id|shape|coords|href|target|alt]'
);
