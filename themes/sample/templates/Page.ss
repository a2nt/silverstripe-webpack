<!DOCTYPE html>
<html lang="$ContentLocale.ATT" dir="$i18nScriptDirection.ATT">
<%--  manifest="/cache.appcache" --%>
<head>
    <% include MetaHead %>
</head>

<body <% with $SiteConfig %> data-default-lng="$Longitude" data-default-lat="$Latitude"<% end_with %>>
    <% include First %>

    <div class="wrapper">
        <header id="Header" class="container">
            <% include Header %>
        </header>

        <main id="MainContent" data-ajax-region="LayoutAjax">
            <% if $ParentID %>
                $Breadcrumbs
            <% end_if %>

            <% if $SideBarView || $Parent.SideBarView %>
            <div class="$DefaultContainer">
                <div class="row">
                    <div class="col-md-8">
                        $Layout
                    </div>
                    <div class="col-md-4">
                        <div class="page-content">
                            <% if $SideBarView %>
                                $SideBarView
                            <% else %>
                                $Parent.SideBarView
                            <% end_if %>
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

    <%-- Mapbox --%>
    <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v0.48.0/mapbox-gl.js"></script>
    <link href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.48.0/mapbox-gl.css" rel="stylesheet" />

    <%-- place extra requirements after this line --%>
    <div class="extra-code extra-code-site">
        $SiteConfig.ExtraCode
    </div>
</body>
</html>
