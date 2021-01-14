<div id="PageContainer" class="page{$CSSClass} action{$Action}">
    <article class="blog-post blog-entry">

    	<%-- if $FeaturedImage %>
	    <div id="CarouselTop" class="carousel slide js-carousel d-none d-sm-block">
	        <div class="carousel-inner">
	            <div class="carousel-item active">
	                <img class="d-block w-100" src="$FeaturedImage.FocusFill(1200,400).URL" alt="$Title">
	            </div>
	        </div>
	    </div>
	    <% end_if --%>

		<% include Content %>

        <div class="page-content">
			<div class="element element__blog-meta">
				<div class="element-container $Top.DefaultContainer">
					<% include SilverStripe\\Blog\\EntryMeta %>
				</div>
			</div>
		</div>
    </article>

	<% if $CommentsForm %>
	<div class="element element__comments blog__comments blog-post__comments">
		<div class="element-container $DefaultContainer">
			$CommentsForm
		</div>
	</div>
	<% end_if %>
</div>

<%-- include SilverStripe\\Blog\\BlogSideBar --%>
