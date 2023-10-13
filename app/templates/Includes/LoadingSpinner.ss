<style>
	button{background:none;border:0}
    .container{margin-left:auto;margin-right:auto;padding-left:0.75rem;padding-right:0.75rem}
    @media (min-width: 1368px){.container{max-width:1180px}}
    .meta-MetaWindow {position:fixed}
    .collapse:not(.show),.offline-message:not(.show){display:none}
    .row {display:flex;justify-content:space-between}
    .breadcrumb{list-style:none}
    .breadcrumb-item{display:inline-block}
    <%-- Site Specific --%>
	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(1.35rem, 0);
		}
	}
	body,
	html {
		font-size: 14px;
		margin: 0;
		padding: 0;
		background: #fff;
		color: #212529;
		overflow-x: hidden;
	}
	/*@media (min-width: 2000px) {
		html, body {
			font-size: .9vw;
		}
	}*/
	#PageLoading {
		position: fixed;
		left: 0;
		top: 0;
		margin: 0;
		width: 100% !important;
		height: 100% !important;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-align: center;
		align-items: center;
		-ms-flex-pack: center;
		justify-content: center;
		z-index: 2000;
		will-change: opacity;
		background: #fff;
		color: #212529;
	}
	#PageLoading .logo {
		width:100px;
		width: 12.5vw;
	}
	#PageLoading .tagline {
		margin-top:1rem;
		margin-bottom:1rem;
		color: #fff;
		font-size:1.8rem;
		font-size: 4vh;
		letter-spacing: .25em;
	}
	.main-bn {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 99999999;
		padding: 0.5rem 1rem;
		text-align: center;
		color: #fff;
		background: #ff0000;
	}
	img,
	iframe {
		max-width: 100%;
	}
	.loading-spinner {
		text-align: center;
	}
	.lds-ellipsis {
		margin-top:1.5rem;
		display: inline-block;
		position: relative;
		width: 4.57rem;
		height: 1rem;
		color: #fff;
	}
	.lds-ellipsis div {
		position: absolute;
		top:0.15rem;
		width: 0.78rem;
		height: 0.78rem;
		border-radius: 50%;
		background: #888;
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}
	.lds-ellipsis div:nth-child(1) {
		left: 0.42rem;
		animation: lds-ellipsis1 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(2) {
		left: 0.9rem;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(3) {
		left: 1.85rem;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(4) {
		left: 3.21rem;
		animation: lds-ellipsis3 0.6s infinite;
	}
	@keyframes lds-text {
		from {
			font-size: 1em;
		}
		to {
			font-size: 1.5em;
		}
	}
	.lds-text {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -5rem;
		margin-top: 8rem;
		font-size: 0.8rem;
		letter-spacing: 0.25em;
		color: #fff;
	}
	.lds-text b {
		font-weight: 300;
		animation: lds-text 5s ease infinite alternate;
	}
	.lds-text b:nth-child(1) {
		animation-delay: 0.5s;
	}
	.lds-text b:nth-child(2) {
		animation-delay: 1s;
	}
	.lds-text b:nth-child(3) {
		animation-delay: 1.5s;
	}
	.lds-text b:nth-child(4) {
		animation-delay: 2s;
	}
	.lds-text b:nth-child(5) {
		animation-delay: 2.5s;
	}
	.lds-text b:nth-child(6) {
		animation-delay: 3s;
	}
	.lds-text b:nth-child(7) {
		animation-delay: 3.5s;
	}
	.lds-text b:nth-child(8) {
		animation-delay: 4s;
	}
	.lds-text b:nth-child(9) {
		animation-delay: 4.5s;
	}
	.lds-text b:nth-child(10) {
		animation-delay: 5s;
	}
	@media (orientation: portrait) {
		#PageLoading .logo {
			width:50vw;
		}
		#PageLoading .tagline {
			font-size: 4vw;
		}
	}
</style>

<% with $SiteConfig %>
<div id="PageLoading">
	<div class="loading-spinner">
		<img
			class="logo"
			src="{$ResourcesURL('logo.png')}"
			width="200"
			alt="{$Title}"
		/><br />
		<div class="lds-ellipsis">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<br />

        <% if $Tagline %>
        <div class="tagline">
            $Tagline
        </div>
        <% else %>
        	<div class="lds-placeholder">LOADING...</div>
        	<div class="lds-text">
	        	<b>L</b>
				<b>O</b>
				<b>A</b>
				<b>D</b>
				<b>I</b>
				<b>N</b>
				<b>G</b>
				<b>.</b>
				<b>.</b>
				<b>.</b>
			</div>
        <% end_if %>
	</div>
</div>
<% end_with %>
