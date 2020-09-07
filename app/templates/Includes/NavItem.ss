<% if $Children %>
    <li class="nav-item dropdown<% if $isCurrent || $isSection %> active <% end_if %> {$CSSClass} {$ExtraClass}">
        <% include NavItem_link %>

        <b
                class="nav-dropdown dropdown-toggle"
                id="NavDropdownToggler{$ID}"
                role="button"
                data-toggle="hover"
                data-allow-click="true"
                aria-haspopup="true"
                aria-expanded="false"
        >
            <i class="fas fa-chevron-right"></i>
        </b>

        <ul class="dropdown-menu" aria-labelledby="NavItem{$ID}">
            <% loop $Children %>
                <% include NavItem ExtraClass="dropdown-item" %>
            <% end_loop %>
        </ul>
    </li>
<% else %>
    <li class="nav-item {$CSSClass} $ExtraClass <% if $isCurrent || $isSection %> active<% end_if %>">
        <% include NavItem_link %>
    </li>
<% end_if %>
