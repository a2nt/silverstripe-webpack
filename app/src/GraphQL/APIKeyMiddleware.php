<?php


namespace App\GraphQL;


use GraphQL\Type\Schema;
use SilverStripe\GraphQL\Middleware\QueryMiddleware;
use App\Templates\WebpackTemplateProvider;

class APIKeyMiddleware implements QueryMiddleware
{
	public function process(Schema $schema, $query, $context, $params, callable $next)
    {
    	var_dump($context);
    	die('saaddsdsads');
    	if($request->getHeader('apikey') === WebpackTemplateProvider::config()['GRAPHQL_API_KEY']) {
		 return $next($schema, $query, $context, $params);
	    }

    	throw new \Exception('Invalid API key token');
    }
}
