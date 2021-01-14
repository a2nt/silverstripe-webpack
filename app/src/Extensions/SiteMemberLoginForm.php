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
		$actions = $this->Actions();

		$email = $fields->fieldByName('Email');
		if ($email) {
			$email->setAttribute('autocomplete', 'email');
		}

		$pass = $fields->fieldByName('Password');
		if($pass) {
			//$pass->setAttribute('autocomplete', 'current-password');
			$pass->setAutofocus(true);
		}

		$btn = $actions->fieldByName('action_doLogin');
		if($btn) {
			$btn->setUseButtonTag(true);
			$btn->setButtonContent('<i class="fas fa-check"></i> '.$btn->Title());
			$btn->addExtraClass('btn-lg');
		}

		if (Director::isLive()) {
			$this->enableSpamProtection();
		}
	}
}