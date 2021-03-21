<div class="element__content<% if $Style %> $CssStyle<% end_if %>">
	<% if $ShowTitle %>
        <h2 class="element__title">$Title</h2>
    <% end_if %>

    <div class="element__html typography">
        $HTML
    </div>

    <% if $BlockLink %>
        <a href="$BlockLink.LinkURL" class="element__link btn btn-default stretched-link">
            $BlockLink.Title
        </a>
    <% end_if %>
</div>
