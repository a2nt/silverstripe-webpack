<div id="PageContainer" class="page{$CSSClass} action{$Action}">
	<% include Content %>

	<div class="page-content">
		<div class="element">
			<div class="$DefaultContainer">
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
			</div>
		</div>

		<% if $PaginatedList.Exists %>
			<% loop $PaginatedList %>
			<div class="element">
				<div class="$Top.DefaultContainer">
					<% include BlogPostInfo %>
				</div>
			</div>
			<% end_loop %>
		<% else %>
			<div class="element">
				<div class="$DefaultContainer">
					<p><%t SilverStripe\\Blog\\Model\\Blog.NoPosts 'There are no posts' %></p>
				</div>
			</div>
		<% end_if %>

		<div class="element">
			<div class="$DefaultContainer">
			<% with $PaginatedList %>
				<% include Objects\Pagination %>
			<% end_with %>
			</div>
		</div>

		<% if $CommentsForm %>
		<div class="element">
			<div class="$DefaultContainer">
				$CommentsForm
			</div>
		</div>
		<% end_if %>
	</div>
</div>

<%-- include SilverStripe\\Blog\\BlogSideBar --%>
