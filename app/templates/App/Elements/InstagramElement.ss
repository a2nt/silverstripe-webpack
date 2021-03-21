<% if $ShowTitle %>
    <h2 class="element__title">$Title</h2>
<% end_if %>

<div class="element__content">
	<div class="element__feed jsInstagramFeed" $AttributesHTML></div>
	<div class="feed__link"><a href="{$FeedLink}" target="_blank">{$FeedTitle}</a></div>
</div>
