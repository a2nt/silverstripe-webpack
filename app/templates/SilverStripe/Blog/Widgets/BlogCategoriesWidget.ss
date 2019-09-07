<% if $Categories %>
	<ul class="list-unstyled list-inline">
		<% loop $Categories %>
			<li class="list-inline-item">
				<a href="$Link" title="$Title" class="btn btn-secondary">
					<span class="text">$Title</span>
				</a>
			</li>
		<% end_loop %>
	</ul>
<% end_if %>
