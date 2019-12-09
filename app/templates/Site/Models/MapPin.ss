<div id="MapPin{$ID}" data-id="{$ID}" class="location">
    <div class="fn">{$Title}</div>
    <div class="addr">{$Address}</div>
    <% if $Address2 %>
        <div class="addr2">{$Address2}</div>
    <% end_if %>
    <% if $City || $PostalCode %>
        <div class="city">
            {$City}, {$State} {$PostalCode}
        </div>
    <% end_if %>
    <% if $Country %>
        <div class="d-none">{$Country}</div>
    <% end_if %>
    <% if $PhoneNumber %>
        <% with $PhoneNumber %>
            T: <a href="$LinkURL" class="tel">$Title</a><br/>
        <% end_with %>
    <% end_if %>
    <% if $Fax %>
        <% with $Fax %>
            F: <span class="fax">$Title</span>
        <% end_with %>
    <% end_if %>
    <div class="dir-link">
        <a href="$DirectionsURL" target="_blank">Get Directions &raquo;</a>
    </div>
</div>
