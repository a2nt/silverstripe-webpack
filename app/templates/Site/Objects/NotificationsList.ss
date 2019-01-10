<% if $ShowNotifications && $NotificationsToday %>
    <% loop $NotificationsToday %>
        <div class="alert alert-warning">
            <% if $Title %>
                <b>$Title:</b>
            <% end_if %>
            $Content
        </div>
    <% end_loop %>
<% end_if %>