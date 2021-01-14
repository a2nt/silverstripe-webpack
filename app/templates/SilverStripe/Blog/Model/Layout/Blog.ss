<div id="PageContainer" class="page{$CSSClass} action{$Action}">
	<% include Content ExcludeHeader=true %>

	<div class="page-content">
		<div class="element page-header-element d-block">
			<div class="element-container $DefaultContainer">
				<% if $ArchiveYear %>
					<%t SilverStripe\\Blog\\Model\\Blog.Archive 'Archive' %>:
					<% if $ArchiveDay %>
						<h1 class="page-header subcategory">$ArchiveDate.Nice</h1>
					<% else_if $ArchiveMonth %>
						<h1 class="page-header subcategory">$ArchiveDate.format('F, Y')</h1>
					<% else %>
						<h1 class="page-header subcategory">$ArchiveDate.format('Y')</h1>
					<% end_if %>
				<% else_if $CurrentTag %>
					<h1 class="page-header subcategory">
						<%t SilverStripe\\Blog\\Model\\Blog.Tag 'Tag' %>: $CurrentTag.Title
					</h1>
				<% else_if $CurrentCategory %>
					<h1 class="page-header subcategory">
						<%t SilverStripe\\Blog\\Model\\Blog.Category 'Category' %>: $CurrentCategory.Title
					</h1>
				<% else %>
					<h1 class="page-header">
			            $Title
			        </h1>
				<% end_if %>
			</div>
		</div>

		<% if $PaginatedList.Exists %>
		<div class="list_blogpost">
			<% loop $PaginatedList %>
			<div class="element element__blogpost element__blogpost__short">
				<div class="element-container $Top.DefaultContainer">
					<% include SilverStripe\Blog\Includes\BlogPostInfo %>
				</div>
			</div>
			<% end_loop %>
		</div>
		<% else %>
			<div class="element element__no_blogposts">
				<div class="element-container $DefaultContainer">
					<p class="blog__no-posts alert alert-info alert-block">
						<%t SilverStripe\\Blog\\Model\\Blog.NoPosts 'There are no posts' %>
					</p>
				</div>
			</div>
		<% end_if %>

		<div class="element element__pagination">
			<div class="element-container $DefaultContainer">
			<% with $PaginatedList %>
				<% include Objects\Pagination %>
			<% end_with %>
			</div>
		</div>

		<% if $CommentsForm %>
		<div class="element element__comments blog__comments">
			<div class="element-container $DefaultContainer">
				$CommentsForm
			</div>
		</div>
		<% end_if %>
	</div>
</div>

<%-- include SilverStripe\\Blog\\BlogSideBar --%>
