<div class="blog-post-info row">
    <% if $FeaturedImage %>
    <div class="col col-sm-3">
        <div class="img card-img-top">
            <img
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                data-lazy-src="$FeaturedImage.Fill(350,200).URL" alt="$Title.ATT"
            />
        </div>
    </div>
    <% end_if %>

    <div class="col">
        <div class="card-body">
            <h3 class="card-title title">
                $Title
            </h3>

            <div class="published-date">
                <span class="day">$PublishDate.Format("d")</span>
                <span class="month">$PublishDate.Format("MMM")</span>
            </div>

            <div class="card-text typography summary">
                $Summary
            </div>

            <% include SilverStripe\\Blog\\EntryMeta %>
        </div>
    </div>

    <a href="{$Link}" class="btn btn-link stretched-link"><span class="sr-only">$Title</span></a>
</div>
