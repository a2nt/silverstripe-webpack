<div class="blog-post__meta text-muted">
	<% if $Categories.exists %>
		<div class="blog-post__categories categories">
			<span class="val-title"><%t SilverStripe\\Blog\\Model\\Blog.PostedIn "Posted in" %></span>
			<% loop $Categories %>
				<a href="$Link" title="$Title" class="blog-post__cat">$Title</a><% if not Last %>, <% else %>;<% end_if %>
			<% end_loop %>
		</div>
	<% end_if %>

	<% if $Tags.exists %>
		<div class="blog-post__tags">
			<span class="val-title"><%t SilverStripe\\Blog\\Model\\Blog.Tagged "Tagged" %></span>
			<% loop $Tags %>
				<a href="$Link" title="$Title" class="blog-post__tag">$Title</a><% if not Last %>, <% else %>;<% end_if %>
			<% end_loop %>
		</div>
	<% end_if %>

	<div class="blog-post__ago">
		<span class="val-title"><%t SilverStripe\\Blog\\Model\\Blog.Posted "Posted" %></span>
		<a href="$MonthlyArchiveLink" class="val">$PublishDate.ago</a>
	</div>

	<% if $Credits %>
		<div class="blog-post__credits">
			<span class="val-title"><%t SilverStripe\\Blog\\Model\\Blog.By "by" %></span>

			<% loop $Credits %>
				<% if not $First && not $Last %>, <% end_if %>
				<% if not $First && $Last %> <%t SilverStripe\\Blog\\Model\\Blog.AND "and" %> <% end_if %>
				<% if $URLSegment && not $Up.ProfilesDisabled %>
					<a href="$URL" class="blog-post__credit">$Name.XML</a>
				<% else %>
					<span class="blog-post__credit">$Name.XML</span>
				<% end_if %>
			<% end_loop %>
		</div>
	<% end_if %>

	<% if $Comments.exists %>
		<a class="blog-post__comments" href="{$Link}#comments-holder">
			<span class="val">$Comments.count</span>
			<span class="val-title"><%t SilverStripe\\Blog\\Model\\Blog.Comments "comments" %></span>
		</a>
	<% end_if %>

	<% if $MinutesToRead %>
	<div class="blog-post__read-time">
		<% if $MinutesToRead < 1 %>
			<span class="val val--less">
				<%t SilverStripe\\Blog\\Model\\Blog.LessThanAMinuteToRead "Less than a minute to read" %>
			</span>
		<% else %>
			<span class="val">
				$MinutesToRead
			</span>
			<span class="val-title"><%t SilverStripe\\Blog\\Model\\Blog.MinutesToRead "Minute(s) to read" %></span>
		<% end_if %>
	</div>
	<% end_if %>
</div>
