<% if $ShowTitle || $Content %>
    <div class="slider-caption">
        <% if $ShowTitle %>
            <h2 class="element__title">$Title</h2>
        <% end_if %>
        <% if $Content %><div class="element__html typography">$Content</div><% end_if %>
    </div>
<% end_if %>

<% if $SlideShow %>
<div class="element__content">
    <div id="Carousel{$ID}" class="element__carousel carousel slide js-carousel"<% if $SlideShow.count > 1 %><% if $Interval %> data-interval="$Interval"<% end_if %> data-indicators="true" data-arrows="true"<% end_if %>>
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
</div>
<% end_if %>
