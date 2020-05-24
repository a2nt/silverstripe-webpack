<% if $ShowNotifications && $NotificationsToday %>
	<div class="notifications-list">
    <% loop $NotificationsToday %>
        <div class="alert alert-warning">
            <div class="$Top.DefaultContainer">
                <b class="btn btn-danger btn-close" data-dismiss="alert" aria-label="Close">
                    <i class="fas fa-times"></i>
                </b>
                <% if $Title %>
                    <b>$Title:</b>
                <% end_if %>
                $Content
            </div>
        </div>
    <% end_loop %>
    </div>
<% end_if %>
