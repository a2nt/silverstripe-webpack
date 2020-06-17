<div class="blog-post-info">
	<div class="row">
	    <%-- div class="published-date">
	        <div class="day">$PublishDate.Format("d")</div>
	        <div class="month">$PublishDate.Format("MMM")</div>
	    </div --%>
	    <div class="col-sm-5">
		    <% if $FeaturedImage %>
		        <div class="img card-img-top">
		            $FeaturedImage.Fill(350,200)
		        </div>
		    <% end_if %>
		</div>

		<div class="col-sm-7 blog-body">
	        <h2 class="card-title title h3">
	        	$Title
	        </h2>

	        <div class="card-text typography summary">
	            $Summary
	        </div>

	        <a href="{$Link}" class="btn btn-link stretched-link">
	        	<span class="sr-only"><%t SilverStripe\\Blog\\Model\\Blog.READMORE "Read More" %> &raquo;</span>
	        </a>

	        <% include SilverStripe\\Blog\\EntryMeta %>
	    </div>
	</div>
</div>
