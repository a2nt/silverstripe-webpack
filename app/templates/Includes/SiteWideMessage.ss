<% if $SiteWideMessage %>
    <div class="alert alert-fixed-top alert-{$Type}">
    	{$Message}
    </div>
<% end_if %>

<% with $SiteConfig %>
    <% include Site\Objects\NotificationsList %>
<% end_with %>