<% if $Submenu %>
    <nav>
        <ul class="nav flex-column">
        	<% with $Page.Level(1) %>
        	    <li class="nav-item-level1 nav-item {$CSSClass} $ExtraClass">
			        <b class="nav-link">
			            $MenuTitle.XML
			            <% if $isCurrent || $isSection %><i class="sr-only">(current)</i><% end_if %>
			        </b>
			    </li>
        	<% end_with %>

            <% loop $Submenu %>
                <% include NavItem %>
            <% end_loop %>
        </ul>
    </nav>
<% end_if %>
