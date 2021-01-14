<% if $Categories %>
<div class="blog__categories">
	<ul class="list-unstyled list-inline">
		<% loop $Categories %>
			<li class="list-inline-item">
				<a href="$Link">
					<span class="text">$Title</span>
				</a>
			</li>
		<% end_loop %>
	</ul>
</div>
<% end_if %>
