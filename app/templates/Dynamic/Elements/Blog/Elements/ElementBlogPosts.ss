<% if $Title && $ShowTitle %><h2 class="element__title text-center">$Title</h2><% end_if %>
<% if $Content %><div class="element__content">$Content</div><% end_if %>

<% if $PostsList %>
    <div class="row">
    <% loop $PostsList %>
        <div class="col-sm-4">
            <% include BlogPostInfo %>
        </div>
    <% end_loop %>
    </div>
    <%-- p><a href="$Blog.Link" class="btn btn-primary" title="Go to the $Title page">View all posts</a></p --%>
<% end_if %>

