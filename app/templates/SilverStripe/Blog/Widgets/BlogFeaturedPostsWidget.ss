<% if $Posts %>
<div class="blog-posts__featured">
	<ul>
		<% loop $Posts %>
			<li>
				<a href="$Link" title="$Title">
					<span class="arrow">&rarr;</span>
					<span class="text">$Title</span>
				</a>
			</li>
		<% end_loop %>
	</ul>
</div>
<% end_if %>
