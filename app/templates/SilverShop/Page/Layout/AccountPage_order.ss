<div class="container page-content">
    <div class="element">
        <% include SilverShop\Includes\AccountNavigation %>
        <div class="account">
            <% if $Order %>
                <% with $Order %>
                    <h2><%t SilverShop\Model\Order.OrderHeadline "Order #{OrderNo} {OrderDate}" OrderNo=$Reference OrderDate=$Created.Nice %></h2>
                <% end_with %>
            <% end_if %>
            <% if $Message %>
                <div class="alert message $MessageType">$Message</div>
            <% end_if %>
            <% if $Order %>
                <% with $Order %>
                    <% include SilverShop\Model\Order %>
                <% end_with %>
                $ActionsForm
            <% end_if %>
        </div>
    </div>
</div>
