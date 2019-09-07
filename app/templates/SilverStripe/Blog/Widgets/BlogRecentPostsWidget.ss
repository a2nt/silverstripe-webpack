<% if $Posts %>
	<ul class="list-unstyled">
		<% loop $Posts %>
			<li>
				<a href="$Link" title="$Title">
					<span class="text">$Title</span>
				</a>
			</li>
		<% end_loop %>
	</ul>
<% end_if %>
