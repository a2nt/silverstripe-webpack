<% if $Title && $ShowTitle %><h2 class="element__title">$Title</h2><% end_if %>
<% if $Content %><div class="element__html typography">$Content</div><% end_if %>

<% if $PostsList %>
<div class="element__content">
    <div class="row">
    <% loop $PostsList %>
        <div class="col-sm-4">
            <% include SilverStripe\Blog\Includes\BlogPostInfo %>
        </div>
    <% end_loop %>
    </div>
    <%-- p><a href="$Blog.Link" class="element__link btn btn-primary" title="Go to the $Title page">View all posts</a></p --%>
</div>
<% end_if %>

