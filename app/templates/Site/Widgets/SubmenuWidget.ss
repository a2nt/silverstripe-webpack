<% if $Submenu %>
    <nav>
        <ul class="nav flex-column">
            <% loop $Submenu %>
                <% include NavItem %>
            <% end_loop %>
        </ul>
    </nav>
<% end_if %>
