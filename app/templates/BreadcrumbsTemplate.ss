<% if $Pages %>
    <div class="$DefaultContainer">
        <nav class="breadcrumbs" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="/" class="breadcrumb-link">Home</a>
                </li>
                <% loop $Pages %>
                    <li
                        class="breadcrumb-item<% if $Last %> current active<% end_if %>"
                        <% if $Last %> aria-current="page"<% end_if %>
                    >
                        <% if not Up.Unlinked %><a href="$Link" class="graphql-page breadcrumb-link breadcrumb-link__$Pos"><% end_if %>
                        $MenuTitle.XML
                        <% if not Up.Unlinked %></a><% end_if %>
                    </li>
                <% end_loop %>
            </ol>
        </nav>
    </div>
<% end_if %>
