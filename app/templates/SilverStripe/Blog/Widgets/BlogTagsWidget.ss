<% if $Tags %>
<div class="blog-posts__tags">
	<ul class="list-unstyled list-inline">
		<% loop $Tags %>
			<li class="list-inline-item">
				<a href="$Link" title="$Title" class="btn btn-secondary">
					<span class="text">$Title</span>
				</a>
			</li>
		<% end_loop %>
	</ul>
</div>
<% end_if %>
