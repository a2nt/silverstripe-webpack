<% if $ImageResized %>
    <div class="image-element__image<% if $Height %> height{$Height}<% end_if %><% if $Width %> width{$Width}<% end_if %>">
        <% if $ImageLink %><a href="$ImageLink.URL"><% end_if %>
        <img src="$ImageResized.URL" class="img-responsive" alt="$Title.ATT">
        <% if $ImageLink %></a><% end_if %>
    </div>
<% end_if %>

<div class="image-element__caption img-content">
    <div class="container">
        <% if $ShowTitle %><h3 class="image-element__title title">$Title</h3><% end_if %>

        <% if $Content %>
            <div class="image-element__content typography">$Content</div>
        <% end_if %>

        <% if $ImageLink %>
            <a href="$ImageLink.URL" class="image-element__btn btn btn-default">
                $ImageLink.Title
                <i class="fas fa-caret-right"></i>
            </a>
        <% end_if %>
    </div>
</div>