<?php

namespace App\GraphQL;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\ORM\Filterable;

class MenuResolver
{
    public static function resolveLinksFilter(Filterable $list, array $args, array $context)
    {
        var_dump($context);
        die('aaaa');
        return $list;
    }

    public static function resolveMenu(): array
    {
        $pages = SiteTree::get()->filter('ParentID', '0');
        $results = self::getFields($pages);
        return $results;
    }

    protected static function getFields($pages): array
    {
        $results = [];
        foreach ($pages as $p) {
            $results[] = [
                'id' => $p->ID,
                'title' => $p->Title,
                'children' => self::getFields($p->Children()),
            ];
        }

        return $results;
    }
}
