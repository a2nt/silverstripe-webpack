<div class="page-content">
    <h1 class="page-header $DefaultContainer<% if $ElementalArea.Elements.Count < 1 %> no-elements<% end_if %>">$Title</h1>

    <div class="page-content">
        <% if $CurrentElement %>
            $CurrentElement
        <% else %>
            $ElementalArea
        <% end_if %>

        <% if $Form %>
        <div class="container">
            $Form
        </div>
        <% end_if %>

        <% if $ExtraCode %>
        <div class="extra-code extra-code-page">
            $ExtraCode
        </div>
        <% end_if %>
    </div>

</div>
