<% cached 'Navigation', $NavID, $List('SilverStripe\CMS\Model\SiteTree').max('LastEdited'), $List('SilverStripe\CMS\Model\SiteTree').count() %>
<nav id="{$NavID}" class="navbar navbar-expand-lg">
    <button
		class="navbar-toggler"
		type="button"
		data-bs-toggle="collapse"
		data-bs-target="#{$NavID}Content"
		aria-controls="{$NavID}Content"
		aria-expanded="false"
		aria-label="Toggle navigation"
	>
		<i class="navbar-toggler-icon fa fas fa-bars"></i>
	</button>

    <div id="{$NavID}Content" class="collapse navbar-collapse">
        <div class="navbar-nav">
            <% loop $Navigation %>
                <% include NavItem %>
            <% end_loop %>
        </div>
    </div>
</nav>
<% end_cached %>
