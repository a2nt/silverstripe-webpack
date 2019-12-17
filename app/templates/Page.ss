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

            <% if $SideBarView && $SideBarView.Widgets.Count %>
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

    <% include Last %>
</body>
</html>
