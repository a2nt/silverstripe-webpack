<a
    class="nav-link graphql-page $ExtraClass <% if $LinkClass %>{$LinkClass}<% else %>nav-link<% end_if %><% if $RedirectionType = 'External' || $ExternalURL || $OpenInNewWindow %> external<% end_if %><% if $isCurrent || $isSection %> active <% end_if %><% if $isSection %> section<% end_if %>"
    href="{$Link}"
    <% if $RedirectionType = 'External' || $OpenInNewWindow %> target="_blank"<% end_if %>
    data-text="{$MenuTitle.XML}"
>
	<% if $BlockIcon %>
	    <i class="fa-icon $BlockIcon"></i>
	<% end_if %>
    $MenuTitle.XML
    <% if $isCurrent || $isSection %><i class="sr-only">(current)</i><% end_if %>
</a>
