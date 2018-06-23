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
	<div id="PageLoading"><div class="loading-spinner"><div class="bubblingG"><i id="bubblingG_1"></i><i id="bubblingG_2"></i><i id="bubblingG_3"></i></div><br/><%t Page.LOADINGTEXT 'LOADING ..' %></div></div>

    <header class="container">
        <div class="row">
            <div class="col-sm-6">
                <a href="/"><img src="/resources/app/client/dist/img/logo.png" alt="{$SiteConfig.Title}" /></a>
            </div>
            <div class="col-sm-6 text-right">
                <% with $SiteConfig %>
                    <% if $PhoneNumber %>
                        <div class="phone-number">
                            <b>Call us today:</b>
                            $PhoneNumber
                        </div>
                    <% end_if %>
                <% end_with %>
                <% if $SearchForm %>
                    <div id="SearchFormContainer">$SearchForm</div>
                <% end_if %>
            </div>
        </div>

        <% include Navigation Navigation=$SiteConfig.Navigation %>

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
