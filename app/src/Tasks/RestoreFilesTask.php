<?php


namespace App\Tasks;

use SilverStripe\Assets\File;
use SilverStripe\Dev\BuildTask;

class RestoreFilesTask extends BuildTask
{
    protected $title = 'Restore Files Task';

    protected $description = 'Restores file from specific folder';

    protected $enabled = false;

    public function run($request)
    {
        die('Specify path first');
        $path = '*<Path to the folder with files to be restored>*';

        $files = array_diff(scandir($path), ['.','..']);
        foreach ($files as $fileName) {
            $file = File::get()->filter('Name', $fileName);
            if (!$file->count()) {
                echo '<b style="color:red">File name was not found at SS DB: '.$fileName.'</b><br/>'.PHP_EOL;
                continue;
            }

            foreach ($file as $f) {
                if ($f->exists()) {
                    echo 'File #'.$f->ID.' already exists at SS file structure. <b style="color:green">'.$fileName.'</b><br/>' . PHP_EOL;
                    continue;
                }

                echo 'Found non existing at SS file system file and found it at SS DB.'
                    .' Creating the file #'.$f->ID.' at SS file system. "<b style="color:#053bff">' . $fileName . '"</b><br/>' . PHP_EOL;

                $f->setFromLocalFile($path.'/'.$fileName);
                $f->write();
                $f->publishFile();
            }
        }

        die('Success!');
    }
}
