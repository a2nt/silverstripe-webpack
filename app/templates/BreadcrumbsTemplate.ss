<% if $Pages %>
    <nav class="breadcrumbs"><ul>
        <li>
            <a href="/">Home</a>
            $Delimiter.RAW
        </li>
        <% loop $Pages %>
            <li<% if $Last %> class="current"<% end_if %>>
                <% if not Up.Unlinked %><a href="$Link" class="breadcrumb-$Pos"><% end_if %>
                $MenuTitle.XML
                <% if not Up.Unlinked %></a><% end_if %>
                $Up.Delimiter.RAW
            </li>
        <% end_loop %>
    </ul></nav>
<% end_if %>
