<!DOCTYPE html>
<html lang="$ContentLocale.ATT" dir="$i18nScriptDirection.ATT">
<%--  manifest="/cache.appcache" --%>
<head>
    <% include MetaHead %>
</head>

<body oncontextmenu="return false;"<% with $SiteConfig %> data-default-lng="$Longitude" data-default-lat="$Latitude"<% end_with %>>
	<% include First %>

    <div class="wrapper">
        <header id="Header">
            <div class="$DefaultContainer">
                <% include Header %>
            </div>
        </header>

        <main id="MainContent" data-ajax-region="LayoutAjax">
            <% if $ParentID %>
                $Breadcrumbs
            <% end_if %>

            <% if $SideBarView && $SideBar.Widgets.Count %>
            <div class="$DefaultContainer">
                <div class="row">
                    <div class="col-md-8">
                        $Layout
                    </div>
                    <div class="col-md-4">
                        <div class="sidebar page-content">
                            $SideBarView
                        </div>
                    </div>
                </div>
            </div>
            <% else %>
                $Layout
            <% end_if %>
        </main>
    </div>

    <footer id="Footer" class="site-footer footer">
        <% include Footer %>
    </footer>

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
</body>
</html>
