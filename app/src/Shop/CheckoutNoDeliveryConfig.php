<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 8/26/18
 * Time: 1:08 PM
 */

namespace App\Models;


use SilverShop\Checkout\Checkout;
use SilverShop\Checkout\CheckoutComponentConfig;
use SilverShop\Checkout\Component\CustomerDetails;
use SilverShop\Checkout\Component\Notes;
use SilverShop\Checkout\Component\Payment;
use SilverShop\Checkout\Component\Terms;
use SilverShop\Checkout\Component\Membership;
use SilverShop\Model\Order;
use SilverStripe\Omnipay\GatewayInfo;
use SilverStripe\Security\Security;

class CheckoutNoDeliveryConfig extends CheckoutComponentConfig
{
    public function __construct(Order $order)
    {
        parent::__construct($order);
        $this->addComponent(CustomerDetails::create());

        if (Checkout::member_creation_enabled() && !Security::getCurrentUser()) {
            $this->addComponent(Membership::create());
        }

        if (count(GatewayInfo::getSupportedGateways()) > 1) {
            $this->addComponent(Payment::create());
        }

        $this->addComponent(Notes::create());

        $this->addComponent(CheckoutMapComponent::create());
        $this->addComponent(Terms::create());
    }
}
