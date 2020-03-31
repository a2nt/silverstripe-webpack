<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('vendor/autoload.php');
require_once('framework/core/Constants.php');

require_once('app/code/Tasks/TestServer.php');

$req = new \SilverStripe\Control\NullHTTPRequest();

$t = new \Site\Tests\TestServer();
$t->run($req);
