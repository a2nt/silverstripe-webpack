<?php


namespace Site\Extensions;


use SilverStripe\Control\Director;
use SilverStripe\Security\MemberAuthenticator\MemberLoginForm;

class SiteMemberLoginForm extends MemberLoginForm
{
	public function __construct(
        $controller,
        $authenticatorClass,
        $name,
        $fields = null,
        $actions = null,
        $checkCurrentUser = true
    ) {
		parent::__construct($controller, $authenticatorClass, $name, $fields, $actions, $checkCurrentUser);

		$fields = $this->Fields();

		$email = $fields->fieldByName('Email');
		$email->setAttribute('autocomplete', 'email');

		$pass = $fields->fieldByName('Password');
		//$pass->setAttribute('autocomplete', 'current-password');
		$pass->setAutofocus(true);

		if (Director::isLive()) {
			$this->enableSpamProtection();
		}
	}
}