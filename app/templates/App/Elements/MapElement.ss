<% if $ShowTitle %>
    <h2 class="content-element__title">$Title</h2>
<% end_if %>

<% if $Content %>
    <div class="typography">$Content</div>
<% end_if %>

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
