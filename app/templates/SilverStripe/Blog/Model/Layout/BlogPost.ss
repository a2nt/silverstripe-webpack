<div id="PageContainer" class="page{$ClassName} action{$Action}">
    <article class="blog-entry">

    	<% if $FeaturedImage %>
	    <div id="CarouselTop" class="carousel slide js-carousel d-none d-sm-block">
	        <div class="carousel-inner">
	            <div class="carousel-item">
	                <img class="d-block w-100" src="$FeaturedImage.Fill(1200,400).URL" alt="$Title">
	            </div>
	        </div>
	    </div>
	    <% end_if %>

		<% include Content %>

        <div class="page-content">
			<div class="element">
				<div class="container">
					<% include SilverStripe\\Blog\\EntryMeta %>
				</div>
			</div>
		</div>
    </article>

	<% if $CommentsForm %>
    <div class="page-content">
		<div class="element">
			$CommentsForm
		</div>
	</div>
	<% end_if %>
</div>

<% include SilverStripe\\Blog\\BlogSideBar %>
