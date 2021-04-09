<% if $Children %>
    <div class="nav-item dropdown dropdown-hover<% if $SubmenuColumns %> submenu-cols-dropdown<% end_if %> {$CSSClass} {$ExtraClass}">
        <% include NavItem_link ExtraClass="dropdown-toggle-fl dropdown-toggle-notouch" %>

        <button
            id="NavItemButton{$ID}"
            class="nav-link dropdown-toggle dropdown-toggle-sm dropdown-toggle-touch<% if $RedirectionType = 'External' || $ExternalURL || $OpenInNewWindow %> external<% end_if %><% if $DropdownNoLink %> d-block<% end_if %>"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            type="button"
        >
            $MenuTitle.XML
        </button>

        <div class="dropdown-menu<% if $SubmenuColumns %> submenu-cols<% end_if %>" aria-labelledby="NavItemButton{$ID}">
            <ul class="dropdown-list">
                <% loop $Children %>
                    <% include NavItem ExtraClass="dropdown-item" %>
                <% end_loop %>
            </ul>
        </div>
    </div>
<% else %>
    <div class="nav-item {$CSSClass} $ExtraClass">
        <% include NavItem_link ExtraClass='' %>
    </div>
<% end_if %>
