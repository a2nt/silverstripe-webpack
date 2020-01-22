<div class="element">
    <div class="element__container $DefaultContainer">
        <div class="row">
            <div class="col-sm-4">
                <a id="Logo" href="/"><img src="{$ResourcesURL('logo.png')}" alt="{$SiteConfig.Title}" /></a>
            </div>
            <div class="col-sm-8 text-right">
                <% with $SiteConfig %>
                    <% if $PhoneNumber %>
                        <span class="phone-number">
                            $PhoneNumber
                        </span>
                    <% end_if %>
                    <% if $PublicEmail %>
                        <span class="public-email">
                            $PublicEmail
                        </span>
                    <% end_if %>
                <% end_with %>
                <%-- if $SearchForm %>
                    <div id="SearchFormContainer">$SearchForm</div>
                <% end_if --%>
                <% if $SiteConfig.Navigation %>
                    <% include Navigation Navigation=$SiteConfig.Navigation, NavID="Navigation" %>
                <% end_if %>
            </div>
        </div>
    </div>
</div>
