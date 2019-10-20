<% if $Video || $Image %>
    <% if $Video %>
        <div class="video">
            $Video.EmbedHTML.RAW
        </div>
    <% else %>
        <% if $PageLink %><a href="$PageLink.Link" title="$PageLink.MenuTitle.XML" class="btn-primary"><% end_if %>

        <% if $Image %>
            <span class="img">
                <img class="d-block w-100" src="$Image.Fill(1200,600).URL" alt="<% if $Headline %>$Headline<% end_if %>">
            </span>
        <% end_if %>
        <% if $PageLink %></a><% end_if %>
    <% end_if %>
<% end_if %>

<% if $Content || $Headline || $Description || $PageLinkID %>
    <div class="carousel-caption">

    <div class="carousel-caption-container">
        <% if $Headline %><h2 class="carousel-title">$Headline</h2><% end_if %>
        <% if $Content %>
            <div class="carousel-content typography">$Content</div>
        <% else %>
            <% if $Description %><p class="carousel-content">$Description</p><% end_if %>
        <% end_if %>
        <% if $PageLinkID %>
            <p>
                <a href="$PageLink.Link" title="$PageLink.MenuTitle.XML" class="btn btn-default btn-lg">
                    <i class="fas fa-bars"></i>
                    <%t Dynamic\FlexSlider\ORM\FlexSlider.LEARN_MORE "Learn more" %>
                </a>
            </p>
        <% end_if %>
    </div>
<% end_if %>