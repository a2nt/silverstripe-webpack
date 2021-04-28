<% if $Video || $Image %>
    <% if $Video %>
        <div class="video">
            $Video.EmbedHTML.RAW
        </div>
    <% else %>
        <% if $Image || $ImageURL %>
            <span class="img">
                <img class="carousel__img"
                    src="{$EmptyImgSrc}"
                    data-lazy-src="<% if $ImageURL %>$ImageURL<% else %>$Image.FocusFill($SlideWidth,$SlideHeight).URL<% end_if %>"
                    alt="<% if $Headline %>$Headline.XML<% end_if %>"
                />
            </span>
        <% end_if %>

        <% if $SlideLinkID %>
            <% with $SlideLink %>
                <% include NavItem_link MenuTitle=$Title, Link=$LinkURL, LinkClass="stretched-link slide-link slide-link__media" %>
            <% end_with %>
        <% else_if $SlideLinkURL %>
            <% include NavItem_link MenuTitle=$Headline, Link=$SlideLinkURL, LinkClass="stretched-link slide-link slide-link__media" %>
        <% end_if %>

    <% end_if %>
<% end_if %>
