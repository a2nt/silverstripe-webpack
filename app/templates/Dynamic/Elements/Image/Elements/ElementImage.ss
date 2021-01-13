<% if $ImageResized %>
    <div class="image-element__image<% if $Resize %><% if $Height %> height{$Height}<% end_if %><% if $Width %> width{$Width}<% end_if %><% end_if %>">
        <img
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            data-lazy-src="$ImageResized.URL" class="img-responsive" alt="$Title.ATT"
        />
    </div>
<% end_if %>

<% if $ShowTitle || $Content || $ImageLink %>
<div class="image-element__caption img-content">
    <% if $ShowTitle %><h3 class="image-element__title title">$Title</h3><% end_if %>

    <% if $Content %>
        <div class="image-element__content typography">$Content</div>
    <% end_if %>
</div>
<% end_if %>

<% if $ImageLink %>
    <a href="$ImageLink.LinkURL" class="stretched-link">
        <b class="sr-only">$ImageLink.Title</b>
    </a>
<% end_if %>
