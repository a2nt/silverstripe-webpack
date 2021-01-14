<% if $Archive %>
<div class="blog__archive">
	<ul>
		<% loop $Archive %>
			<li>
				<a href="$Link">
					<span class="text">$Title</span>
				</a>
			</li>
		<% end_loop %>
	</ul>
</div>
<% end_if %>
