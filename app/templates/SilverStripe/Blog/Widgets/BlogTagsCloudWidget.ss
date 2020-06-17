<% if $Tags %>
	<ul class="list-unstyled list-inline">
		<% loop $Tags %>
			<li class="list-inline-item">
				<a href="$Link">
					<span class="text tagCount{$NormalizedTag}">$TagName</span>
				</a>
			</li>
		<% end_loop %>
	</ul>
<% end_if %>
