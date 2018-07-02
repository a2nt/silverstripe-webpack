<% if $LinkURL %>
    <a href="$LinkURL"{$TargetAttr}$ClassAttr  title="Go to $Title">
        <% if $Type == 'Phone' %>
            <i class="fas fa-phone"></i>
        <% else_if $Type == 'Email' %>
            <i class="fas fa-envelope-open"></i>
        <% end_if %>
        $Title
    </a>
<% end_if %>