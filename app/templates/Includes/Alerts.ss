<div id="SiteWideAlerts" class="offline-message">
	<div
		class="alert alert-danger alert-offline alert-dismissible fade show"
		role="alert"
	>
		<div class="typography">
			The Internet connection is missing right now, but you're able to
			browse previously opened pages offline.
		</div>
		<button
			type="button"
			class="btn btn-danger btn-close"
			data-bs-dismiss="alert"
			aria-label="Close"
		>
			<i class="fas fa-times"></i>
		</button>
	</div>
	<noscript>
		<div class="main-bn alert alert-fixed-top alert-danger" role="alert">
			Please, enable javascript.
		</div>
	</noscript>

	<!--[if lt IE 11
		]><div class="main-bn alert alert-danger" role="alert">
			<a
				href="https://www.google.com/chrome/browser/desktop/"
				classs="alert-link"
			>
				You are using an outdated browser. For a faster, safer browsing
				experience, upgrade for free today.
			</a>
		</div><!
	[endif]-->

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
