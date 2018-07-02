<% if $Title && $ShowTitle %><h2 class="element__title text-center">$Title</h2><% end_if %>
<% if $Content %><div class="element__content">$Content</div><% end_if %>

<% if $TestimonialsList %>
    <div class="row">
    <% loop $TestimonialsList %>
        <% if $Content || $Name || $Affiliation %>
        <div class="col-sm-6">
            <% include Objects\Testimonial %>
        </div>
        <% end_if %>
    <% end_loop %>
    </div>
<% end_if %>