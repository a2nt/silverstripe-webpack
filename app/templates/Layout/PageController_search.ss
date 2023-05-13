<% with $SearchResults %>
    <div class="element page-header-element d-block no-elements">
        <div class="element-container {$Top.DefaultContainer}">
            <h1 class="page-header">
                $Title
            </h1>
        </div>
    </div>

    <div class="element element-search-results">
        <div class="element-container {$Top.DefaultContainer}">
            <h2 class="search-header">
                $Title
            </h2>
            <% if $Results %>
            <div id="SearchAccordion{$ID}" class="accordion accordion-flush">
                <%-- loop $Results %>
                    <div class="accordion-item">
                        <h3 class="accordion-header">
                        	<button
                        		class="accordion-button collapsed"
                        		type="button"
                        		data-bs-toggle="collapse"
                                data-bs-target="#Collapse{$ID}{$Up.ID}"
                                aria-expanded="false"
                                aria-controls="Collapse{$ID}{$Up.ID}"
							>
                            	$Title
                            </button>
                        </h3>

                        <div
                                id="Collapse{$ID}{$Up.ID}"
                                class="accordion-collapse collapse"
                                aria-labelledby="Heading{$ID}{$Up.ID}"
                                data-bs-parent="#SearchAccordion{$Up.ID}"
                        >
                            <div class="accordion-body">
                                <p>$Summary(100)</p>
                                <a href="{$Link}">Learn More</a>
                            </div>
                        </div>
                    </div>
                <% end_loop --%>
                <% loop $Results %>
                    <h3 class="accordion-header">
                        <a href="$Link" class="accordion-button collapsed">
                            $Title
                            <small>Go to page &raquo;</small>
                        </a>
                    </h3>
                <% end_loop %>
            </div>
            <% else %>
                <h3 class="alert alert-danger not-found">Nothing was found.</h3>
            <% end_if %>
        </div>
    </div>
<% end_with %>
