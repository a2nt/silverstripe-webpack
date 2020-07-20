<?php


namespace Site\Traits;

trait PaginatedListing
{
    private $filter = [];

    public function NextPage($pageID = null)
    {
        $vars = $this->getRequest()->requestVars();
        $vars = array_filter($vars);
        $vars['page'] = $pageID ? $pageID : '2';

        return $this->Link('?'.http_build_query($vars));
    }
}
