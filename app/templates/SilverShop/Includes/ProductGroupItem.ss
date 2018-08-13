<div class="product-item row align-items-center">
    <div class="col-sm-6">
        <% if $Image %>
            <a
                class="product-image"
                href="$Link"
                title="<%t SilverShop\Generic.ReadMoreTitle "Click here to read more on &quot;{Title}&quot;" Title=$Title %>"
            >
                <img src="$Image.Fill(255,430).URL" alt="<%t SilverShop\Page\Product.ImageAltText "{Title} image" Title=$Title %>" />
            </a>
        <% else %>
            <a
                class="product-image product-image-no"
                href="$Link"
                title="<%t SilverShop\Generic.ReadMoreTitle "Click here to read more on &quot;{Title}&quot;" Title=$Title %>"
            ><!-- no image --></a>
        <% end_if %>
    </div>

    <div class="col-sm-6">
        <h3 class="product-title">
            <a
                href="$Link"
                title="<%t SilverShop\Generic.ReadMoreTitle "Click here to read more on &quot;{Title}&quot;" Title=$Title %>"
            >$Title</a>
        </h3>

        <% if $Model %>
            <div class="field field-model">
                <b class="field-title"><%t SilverShop\Page\Product.Model "Model" %>:</b>
                <span class="field-val">$Model.XML</span>
            </div>
        <% end_if %>

        <div class="field field-summary typography">
            $Summary
        </div>

        <div class="controls">
            <% include SilverShop\Includes\Price %>

            <% if $View %>
                <div class="view">
                    <a
                        href="$Link"
                        title="<%t SilverShop\Generic.ReadMoreTitle "Click here to read more on &quot;{Title}&quot;" Title=$Title %>"
                        class="btn btn-success"
                    >
                        <i class="fas fa-cart-bars"></i>
                        <%t SilverShop\Page\Product.View "View Product" %>
                    </a>
                </div>
            <% else_if $canPurchase %>
                <div class="add">
                    <a
                        href="$addLink"
                        title="<%t SilverShop\Page\Product.AddToCartTitle "Add &quot;{Title}&quot; to your cart" Title=$Title %>"
                        class="btn btn-success"
                    >
                        <i class="fas fa-cart-plus"></i>
                        <%t SilverShop\Page\Product.AddToCart "Add to Cart" %>
                        <% if $IsInCart %>
                            ($Item.Quantity)
                        <% end_if %>
                    </a>
                </div>
            <% end_if %>
        </div>
    </div>
</div>
