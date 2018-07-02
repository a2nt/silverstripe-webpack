<div id="PageContainer" class="page{$ClassName} action{$Action}">
    <article class="blog-entry">

		<% include Content %>

        <div class="page-content">
			<div class="element">
				<div class="container">
					<% if $FeaturedImage %>
					<div class="row">
						<div class="col-sm-2">
							$FeaturedImage.Fill(100,100)
						</div>
						<div class="col-sm-10">
							<% include SilverStripe\\Blog\\EntryMeta %>
						</div>
					</div>
					<% else %>
						<% include SilverStripe\\Blog\\EntryMeta %>
					<% end_if %>
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
