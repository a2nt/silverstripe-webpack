<div class="
            element
            page-header-element
            <% if $ElementalArea.Elements.Count < 1 %>
                d-block no-elements
            <% else_if not $ElementalArea.Elements.First.ShowTitle && $ElementalArea.Elements.First.ClassName != App\Elements\SliderElement %>
                d-block
            <% end_if %>
        ">
    <div class="element-container $DefaultContainer">
        <h1 class="page-header">
            $Title
        </h1>
    </div>
</div>
