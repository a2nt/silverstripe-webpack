<div class="vcard h-card">
    <div class="img">
        <img
                class="photo u-photo"
                src="<% if $Photo %>{$Photo.FocusFill(300,300).Link}<% else %>https://placehold.it/300x300<% end_if %>"
                alt="{$Title}"
        />
        <div class="caption">
            <% include Objects\SocialLinks %>
        </div>
    </div>

    <h5 class="fn p-name">
        $FirstName
        $LastName
    </h5>

    <% if $Company || $Position %>
    <div class="company">
        <% if $Company %>
            <span class="org p-org">$Company</span><% if $Position %>,<% end_if %>
        <% end_if %>
        <% if $Position %>
            <span class="category p-category">$Position</span>
        <% end_if %>
    </div>
    <% end_if %>

    <span class="n p-name d-none">
        <span class="given-name p-given-name">$FirstName</span>
        <span class="family-name p-family-name">$LastName</span>
    </span>
</div>
