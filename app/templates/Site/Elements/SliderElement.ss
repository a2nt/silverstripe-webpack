<% if $ShowTitle %>
    <h2 class="slider-element__title text-center">$Title</h2>
<% end_if %>

<% if $SlideShow %>
    <div id="Carousel{$ID}" class="carousel slide js-carousel d-none d-sm-block"<% if $SlideShow.count > 1 %> data-indicators="true" data-arrows="true"<% end_if %>>
        <div class="carousel-inner">
            <% loop $SlideShow %>
            <div class="carousel-item<% if $First %> active<% end_if %>">
                <% if $PageLink %><a href="$PageLink.Link" title="$PageLink.MenuTitle.XML" class="btn-primary"><% end_if %>
                <% if $Image %>
                    <img class="d-block w-100" src="$Image.Fill(1200,600).URL" alt="<% if $Headline %>$Headline<% end_if %>">
                <% end_if %>
                <% if $PageLink %></a><% end_if %>

                <div class="carousel-caption">
                    <div class="carousel-caption-container">
                        <% if $Headline %><h2 class="carousel-title">$Headline</h2><% end_if %>
                        <% if $Description %><p class="carousel-content">$Description</p><% end_if %>
                        <% if $PageLinkID %>
                            <p>
                                <a href="$PageLink.Link" title="$PageLink.MenuTitle.XML" class="btn btn-default btn-lg">
                                    <i class="fas fa-bars"></i>
                                    <%t Dynamic\FlexSlider\ORM\FlexSlider.LEARN_MORE "Learn more" %>
                                </a>
                            </p>
                        <% end_if %>
                    </div>
                </div>
            </div>
            <% end_loop %>
        </div>
    </div>
<% end_if %>
