<?php


namespace Site\GraphQL;


use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\SS_List;
use SilverStripe\Security\Member;
use SilverStripe\GraphQL\Pagination\Connection;
use SilverStripe\GraphQL\Pagination\PaginatedQueryCreator;

class PaginatedReadPagesQueryCreator extends PaginatedQueryCreator
{
    public function createConnection()
    {

        return Connection::create('readPages')
            ->setConnectionType($this->manager->getType('page'))
            ->setArgs([
	            'Link' => [
	            	'type' => Type::string()
	            ]
            ])
            ->setSortableFields(['Sort'])
            ->setConnectionResolver(static function ($object, array $args, $context, ResolveInfo $info) {

            	if (isset($args['Link'])) {
            		$link = $args['Link'];

            		if(SiteTree::has_extension('\TractorCow\Fluent\Extension\FluentSiteTreeExtension')) {
			            $arr = array_filter(explode('/', $args['Link']));

			            $locale = \TractorCow\Fluent\Model\Locale::get()->filter('URLSegment', array_shift($arr))->first();
			            \TractorCow\Fluent\State\FluentState::singleton()->setLocale($locale->Locale);

			            $link = implode('/', $arr);
		            }


            		$list = ArrayList::create();
            		$page = SiteTree::get_by_link($link);
		            $list->add($page);
                }

            	/*$list = \Page::get();

                // Optional filtering by properties
                if (isset($args['ID'])) {
                    $list = $list->filter('ID', $args['ID']);
                }*/

                return $list;
            });
    }
}