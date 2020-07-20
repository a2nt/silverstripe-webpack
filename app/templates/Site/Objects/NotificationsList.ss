<% if $ShowNotifications && $NotificationsToday %>
    <div class="notifications-list">
    <% loop $NotificationsToday %>
        <div class="alert alert-warning">
            <div class="container">
                <% if $DisplayTitle && $Title %>
                    <h2>$Title</h2>
                <% end_if %>

                <div class="typography">
                    $Content
                </div>

                <% if $TargetLink %>
                    <% with $TargetLink %>
                        <a
                            class="alert-link" href="$LinkURL"
                            <% if $OpenInNewWindow %> target="_blank"<% end_if %>
                        >
                            $Title
                        </a>
                    <% end_with %>
                <% end_if %>

                <b class="btn btn-danger btn-close" data-dismiss="alert" aria-label="Close">
                    <i class="fas fa-times"></i>
                </b>
            </div>
        </div>
    <% end_loop %>
    </div>
<% end_if %>
