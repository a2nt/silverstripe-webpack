<div class="cart-page cart-page--checkout page-content">
    <div class="checkout element">
        <% if $PaymentErrorMessage %>
        <div class="container">
            <div class="alert alert-danger message error">
                <%t SilverShop\Page\CheckoutPage.PaymentErrorMessage 'Received error from payment gateway:' %>
                $PaymentErrorMessage
            </div>
        </div>
        <% end_if %>

        <% include Content %>

        <div class="container">
        <% if $Cart %>
            <% with $Cart %>
                <% include SilverShop\Cart\Cart ShowSubtotals=true %>
            <% end_with %>

            $OrderForm
        <% else %>
            <div class="alert alert-warning message warning"><%t SilverShop\Cart\ShoppingCart.NoItems "There are no items in your cart." %></div>
        <% end_if %>
        </div>
    </div>
</div>
