<?php

namespace App\Tasks;

use A2nt\CMSNiceties\Tasks\BuildTask;

class MoveOldData extends BuildTask
{
    protected $title = 'Move Old Data';
    protected $description = 'Move Old Data';
    protected $enabled = false;

    public function run($request)
    {
        die('Done!');
    }
}
