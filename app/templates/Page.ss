<!DOCTYPE html>
<html lang="$ContentLocale.ATT" dir="$i18nScriptDirection.ATT">
<%--  manifest="/cache.appcache" --%>
<head>
    <% include MetaHead %>
</head>

<body oncontextmenu="return false;"<% with $SiteConfig %> data-default-lng="$Longitude" data-default-lat="$Latitude"<% end_with %>>
	<% include First %>

    <div class="wrapper">
        <header id="Header" class="container">
            <% include Header %>
        </header>

        <main id="MainContent" data-ajax-region="LayoutAjax">
            $Layout
        </main>
    </div>

    <footer id="Footer" class="site-footer">
        <% include Footer %>
    </footer>

    <div class="hidden-print">
        $BetterNavigator
    </div>

    <%-- Require CSS+JS from /public/resourses/[js,css]/[ClassName].[js,css] --%>
	$AutoRequirements($ClassName).RAW

    <%-- Mapbox --%>
    <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v0.48.0/mapbox-gl.js"></script>
    <link href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.48.0/mapbox-gl.css" rel="stylesheet" />

	<%-- place extra requirements after this line --%>
    <div class="extra-code extra-code-site">
        $SiteConfig.ExtraCode
    </div>
</body>
</html>
