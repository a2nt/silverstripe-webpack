<% if $Children %>
    <li class="nav-item dropdown<% if $isCurrent || $isSection %> active <% end_if %> {$CSSClass} {$ExtraClass}">
        <a
                class="nav-link dropdown-toggle"
                id="NavItem{$ID}"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                href="{$Link}"
                title="$Title.XML"
        >
            $MenuTitle.XML
            <% if $isCurrent || $isSection %><i class="sr-only">(current)</i><% end_if %>
        </a>

        <ul class="dropdown-menu" aria-labelledby="NavItem{$ID}">
            <% loop $Children %>
                <% include NavItem ExtraClass="dropdown-item" %>
            <% end_loop %>
        </ul>
    </li>
<% else %>
    <li class="nav-item {$CSSClass} $ExtraClass <% if $isCurrent || $isSection %> active<% end_if %>">
        <a class="nav-link" href="{$Link}" title="$Title.XML">
            $MenuTitle.XML
            <% if $isCurrent || $isSection %><i class="sr-only">(current)</i><% end_if %>
        </a>
    </li>
<% end_if %>
