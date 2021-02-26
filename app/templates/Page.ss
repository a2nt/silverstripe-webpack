<!DOCTYPE html>
<html lang="$ContentLocale.ATT" dir="$i18nScriptDirection.ATT">
<%--  manifest="/cache.appcache" --%>
<head>
    <% include MetaHead %>
</head>

<body oncontextmenu="return false;"<% with $SiteConfig %> data-default-lng="$Longitude" data-default-lat="$Latitude"<% end_with %>>
    <div class="wrapper">
        <% include First %>

        <div id="MetaLightboxApp"></div>

        <header id="Header">
            <% include Header %>
        </header>

        <main id="MainContent" class="page-content" data-ajax-region="LayoutAjax">
            <% include MainContent Layout=$Layout %>
        </main>
    </div>

    <footer id="Footer" class="site-footer footer">
        <% include Footer %>
    </footer>

    <% include Last %>
</body>
</html>
