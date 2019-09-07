<div id="PageContainer" class="page{$CSSClass} action{$Action}">
	<% include Content %>

	<div class="page-content">
		<div class="element">
			<div class="container">

				<% if $ArchiveYear %>
					<%t SilverStripe\\Blog\\Model\\Blog.Archive 'Archive' %>:
					<% if $ArchiveDay %>
						<h2 class="subcategory">$ArchiveDate.Nice</h2>
					<% else_if $ArchiveMonth %>
						<h2 class="subcategory">$ArchiveDate.format('F, Y')</h2>
					<% else %>
						<h2 class="subcategory">$ArchiveDate.format('Y')</h2>
					<% end_if %>
				<% else_if $CurrentTag %>
					<h2 class="subcategory"><%t SilverStripe\\Blog\\Model\\Blog.Tag 'Tag' %>: $CurrentTag.Title</h2>
				<% else_if $CurrentCategory %>
					<h2 class="subcategory"><%t SilverStripe\\Blog\\Model\\Blog.Category 'Category' %>: $CurrentCategory.Title</h2>
				<% end_if %>

				<% if $PaginatedList.Exists %>
					<div class="row">
						<% loop $PaginatedList %>
							<div class="col-sm-3 col-md-3">
								<% include BlogPostInfo %>
							</div>
						<% end_loop %>
					</div>
				<% else %>
					<p><%t SilverStripe\\Blog\\Model\\Blog.NoPosts 'There are no posts' %></p>
				<% end_if %>

				<% with $PaginatedList %>
					<% include Objects\Pagination %>
				<% end_with %>

				$CommentsForm
			</div>
		</div>
    </div>
</div>

<%-- include SilverStripe\\Blog\\BlogSideBar --%>
