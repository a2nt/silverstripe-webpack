<div class="blog-post blog-post--info">
	<% if $FeaturedImage %>
		<div class="blog-post__img">
		    $FeaturedImage.Fill(300,200)
		</div>
	<% end_if %>

	<div class="blog-post__body blog-body">
		<h2 class="blog-post__title card-title title h3">
			$Title
		</h2>

		<div class="blog-post__date">
			<span class="blog-post__date__m">$PublishDate.Format("MMMM")</span>
			<span class="blog-post__date__d">$PublishDate.Format("dd"),</span>
			<span class="blog-post__date__y">$PublishDate.Format("YYYY")</span>
		</div>

		<div class="blog-post__summary card-text typography summary">
			$Summary
		</div>

		<a href="{$Link}" class="blog-post__link graphql-page stretched-link">
			<%t SilverStripe\\Blog\\Model\\Blog.READMORE "Read More" %> &raquo;
		</a>

		<% include SilverStripe\\Blog\\EntryMeta %>
	</div>
</div>
