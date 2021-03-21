<% if $Members %>
<div class="element__content<% if $Style %> $CssStyle<% end_if %>">
    <% if $ShowTitle %>
        <h2 class="element__title">$Title</h2>
    <% end_if %>

    <div class="element__content">
        <div class="row">
        <% loop $Members %>
            <div class="col-sm-3">
                <% include Objects\HCard %>
            </div>
        <% end_loop %>
        </div>
    </div>
</div>
<% end_if %>
