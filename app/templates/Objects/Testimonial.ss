<div class="testimonial">
    <div class="testimonial__quote">
        <blockquote class="blockquote text-center">
            <i class="fas fa-quote-left"></i>
            <% if $Content %><p>$Content</p><% end_if %>
            <% if $Name || $Affiliation %>
                <footer class="blockquote-footer">
                    <% if $Name %><div class="fn">$Name</div><% end_if %>
                    <% if $Affiliation || $Position %>
                        <div class="company">$Affiliation<% if $Position && $Affiliation %>, $Position<% else %>$Position<% end_if %></div>
                    <% end_if %>
                </footer>
            <% end_if %>
        </blockquote>
    </div>
</div>