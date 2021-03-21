<% if $ShowTitle %>
    <h2 class="element__title">$Title</h2>
<% end_if %>

<% if $Content %>
    <div class="element__html typography">$Content</div>
<% end_if %>

<div class="element__content">
    <% include Objects\Map %>

    <% if $Locations %>
        <div class="locations">
            <div class="row">
                <% loop $Locations %>
                    <div class="col">
                        $forTemplate
                    </div>
                <% end_loop %>
            </div>
        </div>
    <% end_if %>
</div>
