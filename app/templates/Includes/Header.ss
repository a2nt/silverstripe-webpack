<div class="element">
    <div class="element__container $DefaultContainer">
        <div class="row">
            <div class="col-xl-4">
                <a id="Logo" class="logo" href="/">
                    <img src="{$ResourcesURL('logo.svg')}" width="100" alt="{$SiteConfig.Title}" />
                </a>
                <% with $SiteConfig %>
                    <% if $Tagline %>
                        <div class="tagline">$Tagline</div>
                    <% end_if %>
                <% end_with %>
            </div>
            <div class="col-xl-8 nav-container">
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
