<% if $SiteWideMessage %>
    <% with $SiteWideMessage %>
    <div class="alert alert-fixed-top alert-{$Type}">
    	{$Message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <i class="fas fa-times"></i>
        </button>
    </div>
    <% end_with %>
<% end_if %>
