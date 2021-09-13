<div class="element">
    <div class="element__container $DefaultContainer">
        <div class="row">
            <div class="col col-xl-3">
                <a id="Logo" class="logo" href="/">
                    <img src="{$ResourcesURL('logo.png')}" width="100" alt="{$SiteConfig.Title}" />
                </a>
            </div>
            <div class="col col-xl-9 nav-container">
                <% if $Menu(1) %>
                    <% include Navigation Navigation=$Menu(1), NavID="Navigation" %>
                <% end_if %>
                <%-- if $SearchForm %>
                    <div id="SearchFormContainer">$SearchForm</div>
                <% end_if --%>
                <%-- if $SiteConfig.Navigation %>
                    <% include Navigation Navigation=$SiteConfig.Navigation, NavID="Navigation" %>
                <% end_if --%>
            </div>
        </div>
    </div>
</div>
