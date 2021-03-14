<% if $OpeningHoursToday %>
    <% loop $OpeningHoursToday %>
        $forTemplate<br/>
    <% end_loop %>
<% else %>
    <b class="hours hous-closed">Closed</b>
<% end_if %>