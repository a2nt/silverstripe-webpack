<?php


namespace App\GraphQL;

use SilverStripe\Control\Director;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\GraphQL\Auth\AuthenticatorInterface;
use SilverStripe\ORM\ValidationException;
use SilverStripe\Security\Member;
use App\Templates\WebpackTemplateProvider;
use SilverStripe\Security\Permission;
use SilverStripe\Security\Security;

class APIKeyAuthenticator implements AuthenticatorInterface
{
    public function authenticate(HTTPRequest $request)
    {
        $member = Security::getCurrentUser();
        if (($member && Permission::checkMember($member, 'CMS_ACCESS')) || (
            Director::isLive()
            && $request->getHeader('apikey') !== WebpackTemplateProvider::config()['GRAPHQL_API_KEY']
        )) {
            throw new ValidationException('Restricted resource', 401);
        }

        return Member::get()->first();
    }

    public function isApplicable(HTTPRequest $request)
    {
        if($request->param('Controller') === '%$SilverStripe\GraphQL\Controller.admin'){
            return false;
        }
        
        /*if($request->getHeader('apikey')){
            return true;
        }*/
        return true;
        return false;
    }
}
