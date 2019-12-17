<div class="hidden-print">
    $BetterNavigator
</div>

<%-- Require CSS+JS from /public/resourses/[js,css]/[ClassName].[js,css] --%>
$AutoRequirements($ClassName).RAW

<%-- Mapbox
<script src="https://api.tiles.mapbox.com/mapbox-gl-js/v0.48.0/mapbox-gl.js"></script>
<link href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.48.0/mapbox-gl.css" rel="stylesheet" />--%>

<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i|Roboto:400,400i,700,700i&display=swap&subset=latin-ext" rel="stylesheet" />
<%-- place extra requirements after this line --%>
<div class="extra-code extra-code-site">
    $SiteConfig.ExtraCode
</div>
