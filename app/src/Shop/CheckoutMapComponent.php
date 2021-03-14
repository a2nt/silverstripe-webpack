<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 8/26/18
 * Time: 1:40 PM
 */

namespace App\Models;


use SilverShop\Checkout\Component\CheckoutComponent;
use SilverShop\Model\Order;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\HeaderField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripe\View\SSViewer;

class CheckoutMapComponent extends CheckoutComponent
{
    public function getFormFields(Order $order)
    {
        $config = SiteConfig::current_site_config();

        return FieldList::create(
            HeaderField::create('MapHeader', 'Pick up location'),
            LiteralField::create(
                'Map',
                SSViewer::create('Objects\Map')->process($config)
            )
        );
    }

    public function validateData(Order $order, array $data)
    {
    }

    public function setData(Order $order, array $data)
    {
    }

    public function getData(Order $order)
    {
        return [];
    }
}
