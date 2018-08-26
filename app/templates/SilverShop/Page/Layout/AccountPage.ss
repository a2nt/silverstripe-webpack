<div class="page-content">
    <div class="account element">
        <div class="container">
            <% include SilverShop\Includes\AccountNavigation %>
        </div>

        <% include Content %>

        <div class="container">
            <h2 class="page-header">
                <%t SilverShop\Page\AccountPage.PastOrders 'Past Orders' %>
            </h2>

            <% with $Member %>
                <% if $PastOrders %>
                    <% include SilverShop\Includes\OrderHistory %>
                <% else %>
                    <div class="alert alert-warning message warning">
                        <%t SilverShop\Page\AccountPage.NoPastOrders 'No past orders found.' %>
                    </div>
                <% end_if %>
            <% end_with %>
        </div>
    </div>
</div>
