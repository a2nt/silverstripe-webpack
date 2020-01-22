<div class="page-content page-content-main">
    <div class="
        element
        page-header-element
        <% if $ElementalArea.Elements.Count < 1 %>
            d-block no-elements
        <% else_if not $ElementalArea.Elements.First.ShowTitle && $ElementalArea.Elements.First.ClassName != Site\Elements\SliderElement %>
            d-block
        <% end_if %>
    ">
        <div class="$DefaultContainer">
            <h1 class="page-header">
                $Title
            </h1>
        </div>
    </div>

    <% if $CurrentElement %>
        <div class="current-element">
            $CurrentElement
        </div>
    <% else %>
        <div class="elemental-area">
            $ElementalArea
        </div>
    <% end_if %>

    <% if $Form %>
    <div class="page-form-element element">
        <div class="element_container">
            <div class="$DefaultContainer">
                $Form
            </div>
        </div>
    </div>
    <% end_if %>

    <% if $ExtraCode %>
    <div class="page-extra-code">
        <div class="element">
            <div class="element_container">
                <div class="$DefaultContainer">
                    $ExtraCode
                </div>
            </div>
        </div>
    </div>
    <% end_if %>
</div>
