<?php


namespace App\GraphQL;


use SilverStripe\Control\Director;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\GraphQL\Auth\AuthenticatorInterface;
use SilverStripe\ORM\ValidationException;
use SilverStripe\Security\Member;
use App\Templates\WebpackTemplateProvider;

class APIKeyAuthenticator implements AuthenticatorInterface
{
	public function authenticate(HTTPRequest $request)
    {
       if(Director::isLive() && $request->getHeader('apikey') !== WebpackTemplateProvider::config()['GRAPHQL_API_KEY']) {
	       throw new ValidationException('Restricted resource', 401);
       }

       return Member::get()->first();
    }

    public function isApplicable(HTTPRequest $request)
    {
    	/*if($request->getHeader('apikey')){
    		return true;
	    }*/
	    return true;
        return false;
    }
}
