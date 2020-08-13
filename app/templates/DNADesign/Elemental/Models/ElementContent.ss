<div
class="content-element__content<% if $BlockLink %> has-blockLink<% end_if %><% if $BlockIcon %> has-blockIcon<% end_if %><% if $Style %> $CssStyle<% end_if %>"
>
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
        <a href="$BlockLink.LinkURL" class="btn btn-default stretched-link">
            $BlockLink.Title
        </a>
    <% end_if %>
</div>
