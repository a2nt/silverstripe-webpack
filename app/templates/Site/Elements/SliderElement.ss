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
                <div class="carousel-item carousel-item-{$SlideType}<% if no $Controls %> carousel-item-nocontrols<% end_if %><% if $First %> active<% end_if %>">
                    <div class="carousel-slide">
                        <% include SlideItem %>
                    </div>
                </div>
            <% end_loop %>
        </div>
    </div>
<% end_if %>
