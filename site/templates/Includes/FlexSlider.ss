<% if $SlideShow %>
    <%-- Use: data-ride="carousel" to autoinitialize bootstrap carousel --%>
    <div id="Carousel{$ID}" class="carousel slide" data-indicators="true" data-arrows="true">
        <div class="carousel-inner">
            <% loop $SlideShow %>
            <div class="carousel-item<% if $First %> active<% end_if %>">
                <% if $PageLink %><a href="$PageLink.Link" title="$PageLink.MenuTitle.XML"><% end_if %>
                <% if $Image %>
                    <img class="d-block w-100" src="$Image.Fill(1200,600).URL" alt="<% if $Headline %>$Headline<% end_if %>">
                <% end_if %>
                <% if $PageLink %></a><% end_if %>

                <div class="carousel-caption d-none d-md-block">
                    <% if $Headline %><h2 class="carousel-title">$Headline</h2><% end_if %>
                    <% if $Description %><p class="carousel-content">$Description</p><% end_if %>
                    <% if $PageLinkID %>
                        <p>
                            <a href="$PageLink.Link" title="$PageLink.MenuTitle.XML" class="btn btn-default">
                                <%t Dynamic\FlexSlider\ORM\FlexSlider.LEARN_MORE "Learn more" %>
                            </a>
                        </p>
                    <% end_if %>
                </div>
            </div>
            <% end_loop %>
        </div>
    </div>
<% end_if %>
