<% if $ImageResized %>
    <div class="image-element__image<% if $Resize %><% if $Height %> height{$Height}<% end_if %><% if $Width %> width{$Width}<% end_if %><% end_if %>">
        <% if $ImageLink %><a href="$ImageLink.LinkURL"><% end_if %>
        <img
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            data-lazy-src="$ImageResized.URL" class="img-responsive" alt="$Title.ATT"
        />
        <% if $ImageLink %></a><% end_if %>
    </div>
<% end_if %>

<% if $ImageLink %>
    <% with $ImageLink %>
    <a href="$URL"<% if $OpenInNewWindow %> target="_blank"<% end_if %> class="stretched-link">
        <span class="sr-only">$Up.Title</span>
    </a>
    <% end_with %>
<% end_if %>
