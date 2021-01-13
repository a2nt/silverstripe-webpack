<?php


namespace Site\Tasks;

use SilverStripe\Assets\File;
use SilverStripe\Dev\BuildTask;
use SilverStripe\ORM\DB;

class BrokenFilesTask extends BuildTask
{
    protected $title = 'Fix Broken Task';

    protected $description = 'Fix missing PRIMARY keys and Broken files';

    protected $enabled = true;

    public function run($request)
    {
    	$q = DB::query('show tables');
    	$tables = array_keys($q->map());

    	foreach ($tables as $t) {
		    try {
			    DB::query('ALTER TABLE `'.$t.'` ADD PRIMARY KEY (`ID`)');
		    }catch (\Exception $e) {}
	    }

        $files = File::get();
        $i = 0;
        foreach ($files as $file) {
            if (!$file->exists()) {
                echo '<b style="color:red">File name was not found at SS DB: '
                .$file->getField('Name').'</b><br/>'
                .PHP_EOL;

                $i++;

                continue;
            }
        }

        echo ($i > 0) ?
            '<h2 style="color:red">Missing '.$i.' files</h2>'
            : '<h2 style="color:green">All files are ok!</h2>';

        die('Done!');
    }
}
