<% if $Video || $Image %>
    <% if $Video %>
        <div class="video">
            $Video.EmbedHTML.RAW
        </div>
    <% else %>
        <% if $Image || $ImageURL %>
            <span class="img">
                <img class="d-block w-100"
                    src="<% if $ImageURL %>$ImageURL<% else %>$Image.Fill(1400,650).URL<% end_if %>"
                    alt="<% if $Headline %>$Headline.XML<% end_if %>"
                />
            </span>
        <% end_if %>

        <% if $SlideLinkID %>
            <% with $SlideLink %>
                <a href="$LinkURL" title="$Title.XML" class="stretched-link">
                    <span class="sr-only">$Title</span>
                </a>
            <% end_with %>
        <% else_if $SlideLinkURL %>
            <a href="$SlideLinkURL" title="$Headline.XML" class="stretched-link">
                <span class="sr-only">$Headline</span>
            </a>
        <% end_if %>

    <% end_if %>
<% end_if %>

<% if $Content || $Headline || $Description || $SlideLinkID %>
    <div class="carousel-caption container">
        <div class="carousel-caption-container typography">
            <% if $Headline %><h2 class="carousel-title">$Headline</h2><% end_if %>

            <% if $Content %>
                <div class="carousel-content">$Content</div>
            <% else_if $Description %>
                <p class="carousel-content">$Description</p>
            <% end_if %>

            <% if $SlideLinkID %>
                <% with $SlideLink %>
                    <div class="text-right">
                        <a href="$LinkURL" title="$Title.XML" class="slide-link">
                            $Title &raquo;
                        </a>
                    </div>
                <% end_with %>
            <% end_if %>
        </div>
    </div>
<% end_if %>
