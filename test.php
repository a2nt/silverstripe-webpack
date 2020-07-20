<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('vendor/autoload.php');
//require_once('vendor/silverstripe/framework/src/Core/Constants.php');

require_once('app/src/Tests/TestServer.php');

$req = new \SilverStripe\Control\NullHTTPRequest();

$t = new \Site\Tests\TestServer();
$t->run($req);
