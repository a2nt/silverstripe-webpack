<div
data-aos="fade-up"
class="element__content<% if $BlockLink %> has-blockLink<% end_if %><% if $BlockIcon %> has-blockIcon<% end_if %><% if $Style %> $CssStyle<% end_if %>"
>
    <% if $BlockIcon %>
        <i class="element__icon $BlockIcon"></i>
    <% end_if %>

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
