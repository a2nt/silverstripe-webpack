<div id="SiteWideOffline" class="offline-message">
	<div class="alert alert-fixed-top alert-danger alert-offline">
		<div class="$DefaultContainer">
            <div class="typography">
			    The Internet connection is missing right now, but you're able to browse previously opened pages offline.
            </div>
            <b class="btn btn-danger btn-close" data-dismiss="alert" aria-label="Close">
                <i class="fas fa-times"></i>
            </b>
		</div>
	</div>
</div>

<div id="SiteWideMessage">
	<% if $SiteWideMessage %>
		<div class="single-message">
		    <div class="alert alert-fixed-top alert-{$Type}">
		    	<div class="$DefaultContainer">
			    	<b class="btn btn-danger btn-close" data-dismiss="alert" aria-label="Close">
		                <i class="fas fa-times"></i>
		            </b>
			    	{$Message}
		    	</div>
		    </div>
	    </div>
	<% end_if %>

	<% with $SiteConfig %>
	    <% include Site\Objects\NotificationsList NotificationsToday=$NotificationsToday.filter('Area', 'Site') %>
	<% end_with %>
</div>
