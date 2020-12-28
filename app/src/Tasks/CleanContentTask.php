<?php


namespace Site\Tasks;

use SilverStripe\Assets\File;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Dev\BuildTask;

class CleanContentTask extends BuildTask
{
    protected $title = 'Clean content task';

    protected $description = 'Clean content task';

    protected $enabled = true;

    public function run($request)
    {
        $pages = SiteTree::get();
		foreach ($pages as $p) {
			$p->setField('Content', '');
			$p->write();
			echo '#'.$p->ID.' '.$p->getField('Title').'<br/>';
		}

        die('Done!');
    }
}
