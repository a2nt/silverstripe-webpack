<?php

namespace App\Extensions;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\Form;
use SilverStripe\ORM\DataExtension;

class HtmlEditorFieldExtension extends DataExtension
{
    public function updateMediaForm(Form $form)
    {
        $page_id = $_SESSION['CMSMain']['currentPage'];
        $page_urlsegment = SiteTree::get()->byID($page_id)->URLSegment;

        $computerUploadField = $form->Fields()->dataFieldByName('AssetUploadField');
        $computerUploadField->setFolderName(sprintf("%s/images/%s", 'Uploads', $page_urlsegment));
    }
}
