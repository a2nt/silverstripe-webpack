<% if $ImageResized %>
    <div class="element__image__container<% if $Resize %><% if $Height %> height{$Height}<% end_if %><% if $Width %> width{$Width}<% end_if %><% end_if %>">
        <img
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            data-lazy-src="$ImageResized.URL" class="element__image img-responsive" alt="$Title.ATT"
        />
    </div>
<% end_if %>

<% if $ShowTitle || $Content || $ImageLink %>
<div class="element__content">
    <% if $ShowTitle %><h3 class="element__title image-element__title">$Title</h3><% end_if %>

    <% if $Content %>
        <div class="element__html typography">$Content</div>
    <% end_if %>
</div>
<% end_if %>

<% if $ImageLink %>
    <a href="$ImageLink.LinkURL" class="element__link graphql-page stretched-link">
        <b class="sr-only">$ImageLink.Title</b>
    </a>
<% end_if %>
