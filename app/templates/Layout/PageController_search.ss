<% with $SearchResults %>
<div id="PageContainer" class="page{$CSSClass} pageSearch action{$Action}">
    <div class="page-content $Top.DefaultContainer">
        <div class="element">
            <h1 class="h2 page-header no-elements">$Title</h1>

            <% if $Results %>
            <div id="SearchAccordion{$ID}">
                <% loop $Results %>
                    <div class="card">
                        <div class="card-header" id="Heading{$ID}{$Up.ID}">
                            <h3
                                    class="mb-0 a"
                                    data-toggle="collapse"
                                    data-target="#Collapse{$ID}{$Up.ID}"
                                    aria-expanded="false"
                                    aria-controls="Collapse{$ID}{$Up.ID}"
                            >
                                $Title
                                <i class="fas fa-plus accordion-icon pull-right"></i>
                            </h3>
                        </div>

                        <div
                                id="Collapse{$ID}{$Up.ID}"
                                class="collapse"
                                aria-labelledby="Heading{$ID}{$Up.ID}"
                                data-parent="#SearchAccordion{$Up.ID}"
                        >
                            <div class="card-body">
                                <p>$Summary(100)</p>
                                <a href="{$Link}">Learn More</a>
                            </div>
                        </div>
                    </div>
                <% end_loop %>
            </div>
            <% else %>
                <h3>Nothing was found.</h3>
            <% end_if %>
        </div>

    </div>
</div>
<% end_with %>
