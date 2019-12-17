<div class="page-content">
    <h1 class="element page-header $DefaultContainer<% if $ElementalArea.Elements.Count < 1 %> no-elements<% end_if %>">
        $Title
    </h1>

    <% if $CurrentElement %>
        $CurrentElement
    <% else %>
        $ElementalArea
    <% end_if %>

    <% if $Form %>
    <div class="element $DefaultContainer">
        $Form
    </div>
    <% end_if %>

    <% if $ExtraCode %>
    <div class="element $DefaultContainer extra-code extra-code-page">
        $ExtraCode
    </div>
    <% end_if %>
</div>
