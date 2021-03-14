<div id="MapPin{$ID}" data-id="{$ID}" class="location">
    <div class="fn">{$Title}</div>
    <div class="addr">{$Address}</div>
    <% if $Address2 %>
        <div class="addr2">{$Address2}</div>
    <% end_if %>
    <% if $City || $Suburb || $PostalCode || $Postcode %>
        <div class="city">
            {$City}{$Suburb}, {$State} {$PostalCode}{$Postcode}
        </div>
    <% end_if %>
    <% if $Country %>
        <div class="country d-none">{$Country}</div>
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
