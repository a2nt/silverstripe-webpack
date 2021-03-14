<% if $Members %>
<div class="teamMembers-element__content <% if $Style %>$CssStyle<% end_if %>">
    <% if $ShowTitle %>
        <h2 class="teamMembers-element__title text-center">$Title</h2>
    <% end_if %>

    <div class="teamMembers-element__content">
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