<% if $Title && $ShowTitle %><h2 class="element__title">$Title</h2><% end_if %>
<% if $Content %><div class="element__html">$Content</div><% end_if %>

<% if $TestimonialsList %>
<div class="element__content">
    <div class="row">
    <% loop $TestimonialsList %>
        <% if $Content || $Name || $Affiliation %>
        <div class="col-sm-6">
            <% include Objects\Testimonial %>
        </div>
        <% end_if %>
    <% end_loop %>
    </div>
</div>
<% end_if %>
