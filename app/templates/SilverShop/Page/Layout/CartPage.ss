<div class="container page-content">
    <div class="element cart-page">
        <% include Content %>

        <% if $Cart %>

            <% if $CartForm %>
                $CartForm
            <% else %>
                <% with $Cart %><% include SilverShop\Cart\Cart Editable=true %><% end_with %>
            <% end_if %>

        <% else %>
            <div class="alert alert-warning message warning"><%t SilverShop\Cart\ShoppingCart.NoItems "There are no items in your cart." %></div>
        <% end_if %>

        <div class="cartfooter">
            <% if $ContinueLink %>
                <a class="continuelink btn btn-primary" href="$ContinueLink">
                    <i class="fas fa-chevron-left"></i>
                    <%t SilverShop\Cart\ShoppingCart.ContinueShopping 'Continue Shopping' %>
                </a>
            <% end_if %>

            <% if $Cart %>
                <% if $CheckoutLink %>
                    <a class="checkoutlink btn btn-primary" href="$CheckoutLink">
                        <i class="fas fa-chevron-right"></i>
                        <%t SilverShop\Cart\ShoppingCart.ProceedToCheckout 'Proceed to Checkout' %>
                    </a>
                <% end_if %>
            <% end_if %>
        </div>
    </div>
</div>
