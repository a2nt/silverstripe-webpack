<div class="blog-post-info card">
    <div class="published-date">
        <div class="day">$PublishDate.Format("d")</div>
        <div class="month">$PublishDate.Format("MMM")</div>
    </div>
    <% if $FeaturedImage %>
        <div class="img card-img-top">
            <a href="$Link">$FeaturedImage.Fill(350,200)</a>
        </div>
    <% end_if %>

    <div class="card-body">
        <h5 class="card-title title">
            <a href="$Link.ATT" title="Go to the $Title post">
                $Title
            </a>
        </h5>

        <div class="card-text typography summary">
            $Summary
        </div>

        <a href="{$Link}" class="btn btn-link"><%t SilverStripe\\Blog\\Model\\Blog.READMORE "Read More" %> &raquo;</a>

        <% include SilverStripe\\Blog\\EntryMeta %>
    </div>
</div>
