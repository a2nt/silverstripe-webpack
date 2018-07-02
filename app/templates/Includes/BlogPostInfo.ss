<div class="blog-post-info">
    <div class="published-date">
        <div class="day">$PublishDate.Format("d")</div>
        <div class="month">$PublishDate.Format("MMM")</div>
    </div>
    <% if $FeaturedImage %>
        <div class="img">
            <a href="$Link">$FeaturedImage.Fill(350,200)</a>
        </div>
    <% end_if %>

    <% include SilverStripe\\Blog\\EntryMeta %>

    <h5 class="title">
        <a href="$Link.ATT" title="Go to the $Title post">
            $Title
        </a>
    </h5>

    <div class="typography summary">
        $Summary
    </div>

    <a href="{$Link}" class="btn btn-link">Read More &raquo;</a>
</div>