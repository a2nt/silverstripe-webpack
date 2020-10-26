<div
	class="mapAPI-map-container"
	data-map-zoom="$MapZoom"
	data-key="$MapAPIKey"
	data-map-style="<% if $MapStyle %>$MapStyle.XML<% else %>$SiteConfig.MapStyle.XML<% end_if %>"
	<% if $GeoJSON %>data-geojson="$GeoJSON.XML"<% end_if %>
	<% if $ID %>
	    data-id="$ID"
	<% end_if %>
	<% if $MapIcon %>
		data-icon="$Icon.XML"
	<% end_if %>
	<% if $MapTitle %>
	    data-content="$MapTitle.XML"
	<% end_if %>
	<% if $Lat && $Lng %>
	    data-lat="$Lat"
	    data-lng="$Lng"
    <% else_if $FullAddress %>
    	data-address="$FullAddress.XML"
	<% else_if $Address %>
		data-address="$Address.XML"
	<% end_if %>
    data-fly-to-marker="true"
    data-fly-to-bounds="false"
>
    <div class="mapAPI-map"></div>
</div>
