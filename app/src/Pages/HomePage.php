<?php

namespace App\Pages;

use App\Pages\Controllers\HomePageController;
use Page;

class HomePage extends Page
{
    private static $icon_class = 'font-icon-p-home';
	private static $controller_name = HomePageController::class;
}
