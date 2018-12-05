<?php
/**
 * Created by PhpStorm.
 * User: tony
 * Date: 6/23/18
 * Time: 1:23 PM
 */

namespace Site\Extensions;

use SilverStripe\ORM\DataExtension;

class ShoppingCartControllerExtension extends DataExtension
{
    public function updateAddResponse($request, $response, $product, $quantity)
    {
        \PageController::setSiteWideMessage('+'.$quantity.' item(s) was added into the cart', 'success', $request);
    }

    public function updateRemoveResponse($request, $response, $product, $quantity)
    {
        \PageController::setSiteWideMessage(''.$quantity.' item(s) was removed from the cart', 'success', $request);
    }
}
