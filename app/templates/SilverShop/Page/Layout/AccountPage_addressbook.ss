<div class="page-content container">
    <div class="account element">
        <% include SilverShop\Includes\AccountNavigation %>

        <div class="row">
            <div class="col-sm-6">
                <h2 class="pagetitle">
                    <%t SilverShop\Page\AccountPage_AddressBook.Title 'Default Addresses' %>
                </h2>

                <%-- If you want the old dropdown system back you can just use $DefaultAddressForm here instead --%>
                <% if $CurrentMember.AddressBook %>
                    <% loop $CurrentMember.AddressBook %>
                        <div class="card radius address-panel $EvenOdd">
                            <div class="card-body">
                                <% if $ID == $CurrentMember.DefaultShippingAddressID %>
                                    <h5 class="card-title tag def-shipping">
                                        <%t SilverShop\Page\AccountPage_AddressBook.DefaultShippingAddress 'Default Shipping Address' %>
                                    </h5>
                                <% end_if %>

                                <% if $ID == $CurrentMember.DefaultBillingAddressID %>
                                    <h5 class="card-title tag def-billing">
                                        <%t SilverShop\Page\AccountPage_AddressBook.DefaultBillingAddress 'Default Billing Address' %>
                                    </h5>
                                <% end_if %>

                                <div class="card-text">
                                    <% include SilverShop\Model\Address %>
                                </div>

                                <% if $ID != $CurrentMember.DefaultShippingAddressID %>
                                    <a
                                        title="<%t SilverShop\Page\AccountPage_AddressBook.MakeDefaultShippingTitle 'Make this my default shipping address' %>"
                                        href="account/setdefaultshipping/{$ID}"
                                        class="card-link"
                                    >
                                        <i class="fas fa-check"></i>
                                        <%t SilverShop\Page\AccountPage_AddressBook.MakeDefaultShipping 'Make Default Shipping' %>
                                    </a>
                                <% end_if %>

                                <% if $ID != $CurrentMember.DefaultBillingAddressID %>
                                    <a
                                        title="<%t SilverShop\Page\AccountPage_AddressBook.MakeDefaultBillingTitle 'Make this my default billing address' %>"
                                        href="account/setdefaultbilling/{$ID}"
                                        class="card-link"
                                    >
                                        <i class="fas fa-check"></i>
                                        <%t SilverShop\Page\AccountPage_AddressBook.MakeDefaultBilling 'Make Default Billing' %>
                                    </a>
                                <% end_if %>

                                <a
                                    href="account/deleteaddress/{$ID}"
                                    class="remove-address card-link"
                                    title="<%t SilverShop\Page\AccountPage_AddressBook.DeleteAddress 'Delete this address' %>"
                                >
                                    <i class="fas fa-times"></i>
                                    <%t SilverShop\Page\AccountPage_AddressBook.DeleteAddress 'Delete this address' %>
                                </a>
                            </div>
                        </div>
                    <% end_loop %>
                <% else %>
                    <div class="alert alert-warning">
                        <%t SilverShop\Page\AccountPage_AddressBook.NoAddress 'No addresses found.' %>
                    </div>
                <% end_if %>
            </div>

            <div class="col-sm-6">
                <h2><%t SilverShop\Page\AccountPage_AddressBook.CreateNewTitle 'Create New Address' %></h2>

                $CreateAddressForm
            </div>
        </div>
    </div>
</div>
