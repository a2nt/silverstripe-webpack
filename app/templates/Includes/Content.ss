<div class="page-content page-content-main">
    <% if not $ExcludeHeader %>
        <% include PageHeader %>
    <% end_if %>

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
