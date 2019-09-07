<% if $ShowTitle || $Content %>
    <div class="slider-caption ">
        <div class="slider-element__content">
            <% if $ShowTitle %>
                <h2 class="slider-element__title text-center">$Title</h2>
            <% end_if %>
            <% if $Content %><div class="typography">$Content</div><% end_if %>
        </div>
    </div>
<% end_if %>

<% if $SlideShow %>
    <div id="Carousel{$ID}" class="carousel slide js-carousel d-none d-sm-block"<% if $SlideShow.count > 1 %><% if $Interval %> data-interval="$Interval"<% end_if %> data-indicators="true" data-arrows="true"<% end_if %>>
        <div class="carousel-inner">
            <% loop $SlideShow %>
            <div class="carousel-item carousel-item-{$SlideType}<% if $First %> active<% end_if %>">


                <% if $Video || $Image %>
                <div class="carousel-slide">
                    <% if $Video %>
                        <div class="video">
                            $Video.EmbedHTML.RAW
                        </div>
                    <% end_if %>

                    <% if $PageLink %><a href="$PageLink.Link" title="$PageLink.MenuTitle.XML" class="btn-primary"><% end_if %>

                        <% if $Image %>
                            <span class="img">
                                <img class="d-block w-100" src="$Image.Fill(1200,600).URL" alt="<% if $Headline %>$Headline<% end_if %>">
                            </span>
                        <% end_if %>
                    <% if $PageLink %></a><% end_if %>
                </div>
                <% end_if %>

                <% if $Content || $Headline || $Description || $PageLinkID %>
                    <% if not $Video && not $Image %>
                        <div class="carousel-slide">
                    <% else %>
                        <div class="carousel-caption">
                    <% end_if %>

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
                    </div>
                <% end_if %>
            </div>
            <% end_loop %>
        </div>
    </div>
<% end_if %>
