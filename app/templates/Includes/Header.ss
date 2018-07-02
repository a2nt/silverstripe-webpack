<div class="row">
    <div class="col-sm-6">
        <a id="Logo" href="/"><img src="/resources/app/client/dist/img/logo.png" alt="{$SiteConfig.Title}" /></a>
    </div>
    <div class="col-sm-6 text-right">
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
    </div>
</div>

<% if $SiteConfig.Navigation %>
    <% include Navigation Navigation=$SiteConfig.Navigation, NavID="Navigation" %>
<% end_if %>