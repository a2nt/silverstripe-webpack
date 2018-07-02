<div class="content-element__content <% if $Style %>$CssStyle<% end_if %>">
    <% if $BlockIcon %>
        <i class="content-element__icon $BlockIcon"></i>
    <% end_if %>
	<% if $ShowTitle %>
        <h2 class="content-element__title">$Title</h2>
    <% end_if %>

    <div class="typography">
        $HTML
    </div>

    <% if $BlockLink %>
        <a href="$BlockLink.URL" class="btn btn-default">
            $BlockLink.Title
        </a>
    <% end_if %>
</div>
