<div class="container page-content">
    <div class="product-item element">
        <div class="product-details">
            <div class="row">
                <div class="col-sm-6">
                    <% if $Image %>
                        <a
                                class="product-image"
                                href="$Link"
                                title="<%t SilverShop\Generic.ReadMoreTitle "Click here to read more on &quot;{Title}&quot;" Title=$Title %>"
                        >
                            <img src="$Image.Fill(570,840).URL" alt="<%t SilverShop\Page\Product.ImageAltText "{Title} image" Title=$Title %>" />
                        </a>
                    <% else %>
                        <a
                                class="product-image product-image-no"
                                href="$Link"
                                title="<%t SilverShop\Generic.ReadMoreTitle "Click here to read more on &quot;{Title}&quot;" Title=$Title %>"
                        ><!-- no image --></a>
                    <% end_if %>


                    <div class="field field-title">
                        <h4 class="field-val">{$Title}</h4>
                    </div>

                    <% if $InternalItemID %>
                        <div class="field field-internal-item-id">
                            <b class="field-title"><%t SilverShop\Page\Product.Code "Product Code" %>:</b>
                            <span class="field-val">{$InternalItemID}</span>
                        </div>
                    <% end_if %>

                    <% if $Model %>
                        <div class="field field-model">
                            <b class="field-title"><%t SilverShop\Page\Product.Model "Model" %>:</b>
                            <span class="field-val">$Model.XML</span>
                        </div>
                    <% end_if %>

                    <% if $Size %>
                        <div class="field field-size">
                            <b class="field-title"><%t SilverShop\Page\Product.Size "Size" %>:</b>
                            <span class="field-val">$Size.XML</span>
                        </div>
                    <% end_if %>
                </div>

                <div class="col-sm-6">
                    <% include Content %>
                    <% include SilverShop\Includes\Price %>

                    <% if $IsInCart %>
                        <div class="product-num-items-in-cart">
                            <% if $Item.Quantity == 1 %>
                                <%t SilverShop\Page\Product.NumItemsInCartSingular "You have this item in your cart" %>
                            <% else %>
                                <%t SilverShop\Page\Product.NumItemsInCartPlural "You have {Quantity} items in your cart" Quantity=$Item.Quantity %>
                            <% end_if %>
                        </div>
                    <% end_if %>
                </div>
            </div>
        </div>
    </div>

    <%-- include SilverShop\Includes\SideBar --%>
</div>
