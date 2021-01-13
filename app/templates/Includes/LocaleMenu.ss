<% cached 'LocalesNavigationFooter', List(Page).max(LastEdited), $CurrentLocale, $ID %>
<% if $Locales %>
<div id="LocaleMenu">
    <nav class="primary">
        <ul class="list-inline">
            <% loop $Locales %>
                <li class="list-inline-item $LinkingMode<% if $LinkingMode = 'current' %> active<% end_if %>">
                    <a href="$Link.ATT" <% if $LinkingMode != 'invalid' %>rel="alternate"
                       hreflang="$HrefLang"<% end_if %>>$Title.XML</a>
                </li>
            <% end_loop %>
        </ul>
    </nav>
</div>
<% end_if %>
<% end_cached %>
