<%-- Upgrade your Browser notice --%>
<!--[if lt IE 10]><div class="main-bn"><a href="https://www.google.com/chrome/browser/desktop/" title="<%t Page.UPGRADEBROWSER 'Upgrade your browser' %>"><%t Page.OUTDATEDBROWSER 'You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today.' %></a></div><![endif]-->

<%-- No JS enabled notice --%>
<noscript><div class="main-bn"><%t Page.JAVASCRIPTREQUIRED 'Please, enable javascript.' %></div></noscript>

<% include LoadingSpinner %>


<%-- if $isDev || $WebpackActive %>
	<div id="DevUtilities">
		$DeferedCSS('app_dev.css')
		$DeferedJS('app_dev.js')
		<div class="navs">
			<button class="toggle-original">Toggle Original</button>
		</div>
		<div class="original d-none"></div>
	</div>
<% end_if --%>

<%-- Site Wide Alert Message --%>
<% include Alerts %>
