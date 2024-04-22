<?php

use SilverStripe\Core\EnvironmentLoader;

$env = BASE_PATH . '/app/.env';
$loader = new EnvironmentLoader();
$loader->loadFile($env);
/*\SilverStripe\Core\Config\Config::modify()->set(
    \SilverStripe\Control\Email\Email::class,
    'bcc_all_emails_to',//'cc_all_emails_to',
    'test@example.com'
);*/
