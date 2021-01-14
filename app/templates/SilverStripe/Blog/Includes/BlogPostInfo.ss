<div class="blog-post__info blog-post-info">
	<div class="row">
	    <%-- div class="published-date">
	        <div class="day">$PublishDate.Format("d")</div>
	        <div class="month">$PublishDate.Format("MMM")</div>
	    </div --%>
	    <div class="col-sm-5">
		    <% if $FeaturedImage %>
		        <div class="blog-post__img img card-img-top">
		            $FeaturedImage.FocusFill(350,200)
		        </div>
		    <% end_if %>
		</div>

		<div class="col-sm-7 blog-post__body blog-body">
	        <h2 class="blog-post__title card-title title h3">
	        	$Title
	        </h2>

	        <div class="blog-post__summary card-text typography summary">
	            $Summary
	        </div>

	        <a href="{$Link}" class="blog-post__btn btn btn-link stretched-link">
	        	<span class="sr-only"><%t SilverStripe\\Blog\\Model\\Blog.READMORE "Read More" %> &raquo;</span>
	        </a>

	        <% include SilverStripe\\Blog\\EntryMeta %>
	    </div>
	</div>
</div>
