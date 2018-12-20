<% with $SearchResults %>
<div id="PageContainer" class="page action{$Action}">
    <div class="page-content">
        <h1 class="page-header container no-elements">$Title</h1>

        <div class="page-content">
            <% if $Results %>
            <div id="SearchAccordion{$ID}">
                <% loop $Results %>
                    <div class="card">
                        <div class="card-header" id="Heading{$ID}{$Up.ID}">
                            <h5 class="mb-0">
                                <strong
                                        data-toggle="collapse"
                                        data-target="#Collapse{$ID}{$Up.ID}"
                                        aria-expanded="false"
                                        aria-controls="Collapse{$ID}{$Up.ID}"
                                >
                                    $Title
                                </strong>
                            </h5>
                        </div>

                        <div
                                id="Collapse{$ID}{$Up.ID}"
                                class="collapse"
                                aria-labelledby="Heading{$ID}{$Up.ID}"
                                data-parent="#SearchAccordion{$Up.ID}"
                        >
                            <div class="card-body">
                                <p>$Summary</p>
                                <a href="{$Link}">Learn More</a>
                            </div>
                        </div>
                    </div>
                <% end_loop %>
            </div>
            <% else %>
                <h2>Nothing was found.</h2>
            <% end_if %>
        </div>

    </div>
</div>
<% end_with %>