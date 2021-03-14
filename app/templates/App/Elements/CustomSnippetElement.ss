<div class="custom-snippet content-element__content<% if $Style %> $CssStyle<% end_if %>">
	<% if $ShowTitle %>
        <h2 class="content-element__title">$Title</h2>
    <% end_if %>

    <div class="typography">
        $HTML
    </div>

    <% if $BlockLink %>
        <a href="$BlockLink.LinkURL" class="btn btn-default stretched-link">
            $BlockLink.Title
        </a>
    <% end_if %>
</div>
