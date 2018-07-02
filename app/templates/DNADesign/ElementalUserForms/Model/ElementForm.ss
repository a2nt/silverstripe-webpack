<div class="form-element__form $ExtraClass">
    <div class="row">
        <div class="col-md-6">
            <% if $Title && $ShowTitle %>
                <h2 class="form-element__title">$Title</h2>
            <% end_if %>
            $Form
        </div>
    </div>
</div>
