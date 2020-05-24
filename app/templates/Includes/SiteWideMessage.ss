<div id="SiteWideMessage">
	<div class="offline-message">
		<div class="alert alert-fixed-top alert-danger alert-offline">
			<div class="$DefaultContainer">
				<b class="btn btn-danger btn-close" data-dismiss="alert" aria-label="Close">
	                <i class="fas fa-times"></i>
	            </b>
				The Internet connection is missing right now, but you're able to browse previously opened pages offline.
			</div>
		</div>
	</div>

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
	    <% include Site\Objects\NotificationsList %>
	<% end_with %>
</div>
