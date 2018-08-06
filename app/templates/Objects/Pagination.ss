<%-- NOTE: Before including this, you will need to wrap the include in a with block  --%>

<% if $MoreThanOnePage %>
    <nav aria-label="<%t Page.PaginationLabel "Pagination" %>">
        <ul class="pagination justify-content-center">
            <li class="page-item<% if $FirstPage %> disabled<% end_if %>">
                <a class="page-link" href="{$PrevLink}" aria-label="<%t Page.PaginationPrevious "Previous" %>">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only"><%t Page.PaginationPrevious "Previous" %></span>
                </a>
            </li>

            <% loop $PaginationSummary(12) %>
                <li class="page-item<% if $CurrentBool %> active<% end_if %>">
                    <% if $Link %>
                        <a href="$Link" class="page-link">$PageNum</a>
                    <% else %>
                        <span>...</span>
                    <% end_if %>
                </li>
            <% end_loop %>

            <li class="page-item<% if $LastPage %> disabled<% end_if %>">
                <a class="page-link" href="{$NextLink}" aria-label="<%t Page.PaginationNext "Next" %>">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only"><%t Page.PaginationNext "Next" %></span>
                </a>
            </li>
        </ul>
    </nav>
<% end_if %>
