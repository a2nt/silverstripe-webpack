<% if $Posts %>
<div class="blog-posts__recent">
	<ul class="list-unstyled">
		<% loop $Posts %>
			<li>
				<a href="$Link">
					<span class="text">$Title</span>
				</a>
			</li>
		<% end_loop %>
	</ul>
</div>
<% end_if %>
