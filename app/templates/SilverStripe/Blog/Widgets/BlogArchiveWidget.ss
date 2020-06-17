<% if $Archive %>
	<ul>
		<% loop $Archive %>
			<li>
				<a href="$Link">
					<span class="text">$Title</span>
				</a>
			</li>
		<% end_loop %>
	</ul>
<% end_if %>
