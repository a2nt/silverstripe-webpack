<div
	class="mapAPI-map-container"
	data-map-zoom="$MapZoom"
	data-key="$MapAPIKey"
	data-map-style="<% if $MapStyle %>$MapStyle<% else %>$SiteConfig.MapStyle<% end_if %>"
	data-geojson="$GeoJSON.XML"
    data-fly-to-marker="true"
    data-fly-to-bounds="false"
>
    <div class="mapAPI-map"></div>
</div>
