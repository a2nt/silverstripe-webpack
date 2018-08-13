<div class="page-content container">
    <div class="account element">
        <% if $Order %>
            <% with $Order %>
                <h2><%t SilverShop\Model\Order.OrderHeadline "Order #{OrderNo} {OrderDate}" OrderNo=$Reference OrderDate=$Created.Nice %></h2>
            <% end_with %>
        <% end_if %>

        <% if $Message %>
            <div class="alert alert-{$MessageType} message $MessageType">$Message</div>
        <% end_if %>

        <% if $Order %>
            <% with $Order %>
                <% include SilverShop\Model\Order %>
            <% end_with %>
            $Form
        <% end_if %>
    </div>
</div>
