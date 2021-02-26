<?php


namespace Site\Tasks;

use SilverStripe\Assets\File;
use SilverStripe\Dev\BuildTask;

class BrokenFilesTask extends BuildTask
{
    protected $title = 'Broken Files Task';

    protected $description = 'Broken files report';

    protected $enabled = true;

    public function run($request)
    {
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
