<% if $Children %>
    <div class="nav-item dropdown<% if $isCurrent || $isSection %> active <% end_if %><% if $isSection %> section<% end_if %><% if $SubmenuColumns %> submenu-cols-dropdown<% end_if %> {$CSSClass} {$ExtraClass}">
        <% if $DropdownNoLink %>
            <span
                    class="nav-link dropdown-toggle<% if $RedirectionType = 'External' || $ExternalURL || $OpenInNewWindow %> external<% end_if %>"
                    id="NavItem{$ID}"
                    role="button"
                    data-toggle="hover"
                    data-allow-click="true"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-href="{$Link}"
                    data-text="{$MenuTitle.XML}"
                    <% if $RedirectionType = 'External' || $OpenInNewWindow %>data-target="_blank"<% end_if %>
            >
                $MenuTitle.XML
                <% if $isCurrent || $isSection %><i class="sr-only">(current)</i><% end_if %>
            </span>
        <% else %>
            <a
                    class="nav-link dropdown-toggle<% if $RedirectionType = 'External' || $ExternalURL || $OpenInNewWindow %> external<% end_if %>"
                    id="NavItem{$ID}"
                    role="button"
                    data-toggle="hover"
                    data-allow-click="true"
                    aria-haspopup="true"
                    aria-expanded="false"
                    href="{$Link}"
                    data-text="{$MenuTitle.XML}"
                    <% if $RedirectionType = 'External' || $OpenInNewWindow %>target="_blank"<% end_if %>
            >
                $MenuTitle.XML
                <% if $isCurrent || $isSection %><i class="sr-only">(current)</i><% end_if %>
            </a>
        <% end_if %>

        <div class="dropdown-menu<% if $SubmenuColumns %> submenu-cols<% end_if %>" aria-labelledby="NavItem{$ID}">
            <% if $SubmenuColumns %>
                <div class="row">
                    <% loop $Children %>
                        <div class="col-xl-{$Up.SubmenuColumnsLayout}">
                            <% include NavItem_link LinkClass="nav-link nav-link-category" %>

                            <ul class="dropdown-list">
                                <% loop $Children %>
                                    <% include NavItem ExtraClass="dropdown-item" %>
                                <% end_loop %>
                            </ul>
                        </div>
                    <% end_loop %>
                </div>

                <% if $SubmenuNote %>
                    <div class="submenu-note">
                        <% if $NoteLink %>
                            <a
                                href="$NoteLink.LinkURL"
                                <% if $OpenInNewWindow %>target="_blank"<% end_if %>
                            >$SubmenuNote</a>
                        <% else %>
                            $SubmenuNote
                        <% end_if %>
                    </div>
                <% end_if %>
            <% else %>
                <ul class="dropdown-list">
                    <% loop $Children %>
                        <% include NavItem ExtraClass="dropdown-item" %>
                    <% end_loop %>
                </ul>
            <% end_if %>
        </div>
    </div>
<% else %>
    <div class="nav-item {$CSSClass} $ExtraClass <% if $isCurrent || $isSection %> active<% end_if %>">
        <% include NavItem_link %>
    </div>
<% end_if %>
