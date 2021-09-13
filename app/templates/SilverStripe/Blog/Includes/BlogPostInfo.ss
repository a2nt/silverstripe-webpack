<div class="blog-post__info blog-post-info">
	<%-- div class="published-date">
        <div class="day">$PublishDate.Format("d")</div>
        <div class="month">$PublishDate.Format("MMM")</div>
    </div --%>

	<div class="blog-post__body blog-body">
        <h2 class="blog-post__title card-title title h3">
        	$Title
        </h2>

        <div class="blog-post__summary card-text typography summary">
            $Summary
        </div>

        <a href="{$Link}" class="blog-post__link graphql-page stretched-link">
        	<%t SilverStripe\\Blog\\Model\\Blog.READMORE "Read More" %> &raquo;
        </a>

        <% include SilverStripe\\Blog\\EntryMeta %>
    </div>
</div>
