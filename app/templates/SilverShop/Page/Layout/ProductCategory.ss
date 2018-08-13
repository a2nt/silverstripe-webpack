<% include Content %>

<div class="container page-content">
    <div class="product-group element">
        <% if $Products %>
            <div class="category">
                <%-- include Sorter --%>
                <div class="product-list row">
                    <% loop $Products %>
                        <div class="col-sm-6">
                            <% include SilverShop\Includes\ProductGroupItem %>
                        </div>
                    <% end_loop %>
                </div>

                <% with $Products %>
                    <% include Objects\Pagination %>
                <% end_with %>
            </div>
        <% end_if %>
    </div>

    <%-- include SilverShop\Includes\SideBar --%>
</div>
