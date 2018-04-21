<!DOCTYPE html>
<html lang="$ContentLocale.ATT" dir="$i18nScriptDirection.ATT">
<%--  manifest="/cache.appcache" --%>
<head>
    <% include Head %>
</head>

<body oncontextmenu="return false;">
	<%-- Upgrade your Browser notice --%>
	<!--[if lt IE 10]><div class="main-bn"><a href="https://www.google.com/chrome/browser/desktop/" title="<%t Page.UPGRADEBROWSER 'Upgrade your browser' %>"><%t Page.OUTDATEDBROWSER 'You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today.' %></a></div><![endif]-->

	<%-- No JS enabled notice --%>
	<noscript><div class="main-bn"><%t Page.JAVASCRIPTREQUIRED 'Please, enable javascript.' %></div></noscript>

	<%-- Loading Spinner --%>
	<div id="PageLoading"><div class="loading-spinner"><div class="bubblingG"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div><br/><%t Page.LOADINGTEXT 'LOADING ..' %></div></div>

    <header>
        
    </header>
    
    <main data-ajax-region="LayoutAjax">
        $Layout
    </main>
    
    <footer>

    </footer>

    <div class="hidden-print">
        $BetterNavigator
    </div>

    <%-- Require CSS+JS from /public/resourses/[js,css]/[ClassName].[js,css] --%>
	$AutoRequirements($ClassName).RAW

	<%-- place extra requirements after this line --%>
</body>
</html>