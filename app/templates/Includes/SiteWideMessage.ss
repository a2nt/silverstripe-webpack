<div class="alert alert-fixed-top alert-danger alert-offline">
	The Internet connection is missing right now, but you're able to browse previously opened pages offline.
</div>

<% if $SiteWideMessage %>
    <div class="alert alert-fixed-top alert-{$Type}">
    	{$Message}
    </div>
<% end_if %>

<% with $SiteConfig %>
    <% include Site\Objects\NotificationsList %>
<% end_with %>
