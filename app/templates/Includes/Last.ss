<div class="hidden-print hidden-md">
    $BetterNavigator
</div>

<%-- Require CSS+JS from /public/resourses/[js,css]/[ClassName].[js,css] --%>
$AutoRequirements($ClassName).RAW

<%-- Mapbox
<script src="https://api.tiles.mapbox.com/mapbox-gl-js/v0.48.0/mapbox-gl.js"></script>
<link href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.48.0/mapbox-gl.css" rel="stylesheet" />--%>

<%-- place extra requirements after this line --%>
<div class="extra-code extra-code-site">
    $SiteConfig.ExtraCode
</div>
