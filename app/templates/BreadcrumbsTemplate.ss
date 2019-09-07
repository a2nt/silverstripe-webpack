<% if $Pages %>
    <nav class="breadcrumbs $DefaultContainer" aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="/">Home</a>
                <%-- $Delimiter.RAW --%>
            </li>
            <% loop $Pages %>
                <li
                    class="breadcrumb-item<% if $Last %> current active<% end_if %>"
                    <% if $Last %> aria-current="page"<% end_if %>
                >
                    <% if not Up.Unlinked %><a href="$Link" class="breadcrumb-$Pos"><% end_if %>
                    $MenuTitle.XML
                    <% if not Up.Unlinked %></a><% end_if %>
                    <%-- if not $Last %>$Up.Delimiter.RAW<% end_if --%>
                </li>
            <% end_loop %>
        </ol>
    </nav>
<% end_if %>
