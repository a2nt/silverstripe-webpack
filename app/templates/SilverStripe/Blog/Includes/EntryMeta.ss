<div class="blog-post__meta blog-post-meta text-muted">
    <% if $Categories.exists %>
        <div class="blog-post__categories categories">
            <%t SilverStripe\\Blog\\Model\\Blog.PostedIn "Posted in" %>
            <% loop $Categories %>
                <a href="$Link" title="$Title" class="category">$Title</a><% if not Last %>, <% else %>;<% end_if %>
            <% end_loop %>
        </div>
    <% end_if %>

    <% if $Tags.exists %>
        <div class="blog-post__tags tags">
            <%t SilverStripe\\Blog\\Model\\Blog.Tagged "Tagged" %>
            <% loop $Tags %>
                <a href="$Link" title="$Title" class="tag">$Title</a><% if not Last %>, <% else %>;<% end_if %>
            <% end_loop %>
        </div>
    <% end_if %>

    <div class="blog-post__ago posted-ago">
        <%t SilverStripe\\Blog\\Model\\Blog.Posted "Posted" %>
        <a href="$MonthlyArchiveLink">$PublishDate.ago</a>
    </div>

    <% if $Credits %>
        <div class="blog-post__credits credits">
            <%t SilverStripe\\Blog\\Model\\Blog.By "by" %>

            <% loop $Credits %>
                <% if not $First && not $Last %>, <% end_if %>
                <% if not $First && $Last %> <%t SilverStripe\\Blog\\Model\\Blog.AND "and" %> <% end_if %>
                <% if $URLSegment && not $Up.ProfilesDisabled %>
                    <a href="$URL" class="blog-post__credit credit">$Name.XML</a>
                <% else %>
                    <span class="blog-post__credit credit">$Name.XML</span>
                <% end_if %>
            <% end_loop %>
        </div>
    <% end_if %>

    <% if $Comments.exists %>
        <a class="blog-post__comments comments" href="{$Link}#comments-holder">
            <span class="count">$Comments.count</span>
            <%t SilverStripe\\Blog\\Model\\Blog.Comments "comments" %>
        </a>
    <% end_if %>

    <% if $MinutesToRead %>
    <div class="blog-post__reading-time reading-time">
        <% if $MinutesToRead < 1 %>
            <%t SilverStripe\\Blog\\Model\\Blog.LessThanAMinuteToRead "Less than a minute to read" %>
        <% else %>
            $MinutesToRead <%t SilverStripe\\Blog\\Model\\Blog.MinutesToRead "Minute(s) to read" %>
        <% end_if %>
    </div>
    <% end_if %>
</div>
