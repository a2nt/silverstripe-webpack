<% include SlideItem_media %>

<% if $Content || $Headline || $CustomTitle || $Description || $SlideLinkID %>
<div class="container">
    <div class="carousel-caption">
        <div class="carousel-caption-container typography">
            <% if $Headline %>
                <h2 class="carousel-title">
                    $Headline
                </h2>
            <% end_if %>

            <% if $Content %>
                <div class="carousel-content">$Content</div>
            <% else_if $Description %>
                <p class="carousel-content">$Description</p>
            <% end_if %>

            <% if $SlideLinkID %>
                <% with $SlideLink %>
                    <% include NavItem_link MenuTitle=$Title, Link=$LinkURL, LinkClass="slide-link" %>
                <% end_with %>
            <% end_if %>
        </div>
    </div>
</div>
<% end_if %>
