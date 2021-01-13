<?php

namespace Site\Pages;

use Page;

class CataloguePage extends Page
{
	private static $table_name = 'CataloguePage';
    private static $icon_class = 'fas fa-boxes';
    private static $allowed_children = [
    	CatalogueCategoryPage::class,
    ];
}
