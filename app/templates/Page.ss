<!DOCTYPE html>
<html lang="$ContentLocale.ATT" dir="$i18nScriptDirection.ATT">
<%--  manifest="/cache.appcache" --%>
<head>
    <% include MetaHead %>
</head>

<body oncontextmenu="return false;"<% with $SiteConfig %> data-default-lng="$Longitude" data-default-lat="$Latitude"<% end_with %>>
	<%-- Upgrade your Browser notice --%>
	<!--[if lt IE 10]><div class="main-bn"><a href="https://www.google.com/chrome/browser/desktop/" title="<%t Page.UPGRADEBROWSER 'Upgrade your browser' %>"><%t Page.OUTDATEDBROWSER 'You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today.' %></a></div><![endif]-->

	<%-- No JS enabled notice --%>
	<noscript><div class="main-bn"><%t Page.JAVASCRIPTREQUIRED 'Please, enable javascript.' %></div></noscript>

	<%-- Loading Spinner --%>
	<div id="PageLoading"><div class="loading-spinner"><div class="bubblingG"><i id="bubblingG_1"></i><i id="bubblingG_2"></i><i id="bubblingG_3"></i></div><br/><%t Page.LOADINGTEXT 'LOADING ..' %></div></div>

    <%-- Site Wide Alert Message --%>
    <% include SiteWideMessage %>

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
