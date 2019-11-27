<%-- Upgrade your Browser notice --%>
<!--[if lt IE 10]><div class="main-bn"><a href="https://www.google.com/chrome/browser/desktop/" title="<%t Page.UPGRADEBROWSER 'Upgrade your browser' %>"><%t Page.OUTDATEDBROWSER 'You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today.' %></a></div><![endif]-->

<%-- No JS enabled notice --%>
<noscript><div class="main-bn"><%t Page.JAVASCRIPTREQUIRED 'Please, enable javascript.' %></div></noscript>

<%-- Loading Spinner --%>
<div id="PageLoading">
    <div class="loading-spinner">
        <img src="favicon.ico" alt="{$SiteConfig.Title}" /><br/>
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        <br/><%t Page.LOADINGTEXT 'LOADING ..' %>
    </div>
</div>

<%-- Site Wide Alert Message --%>
<% include SiteWideMessage %>