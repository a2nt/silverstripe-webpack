<div class="page-content container">
    <div class="account element">
        <% include SilverShop\Includes\AccountNavigation %>


        <h2 class="pagetitle">
            <%t SilverShop\Page\AccountPage_AddressBook.Title 'Default Addresses' %>
        </h2>

        <%-- If you want the old dropdown system back you can just use $DefaultAddressForm here instead --%>
        <% if $CurrentMember.AddressBook %>
            <% loop $CurrentMember.AddressBook %>
                <div class="panel radius address-panel $EvenOdd">
                    <% if $ID == $CurrentMember.DefaultShippingAddressID %>
                        <span class="tag def-shipping">
                            <%t SilverShop\Page\AccountPage_AddressBook.DefaultShippingAddress 'Default Shipping Address' %>
                        </span>
                    <% end_if %>

                    <% if $ID == $CurrentMember.DefaultBillingAddressID %>
                        <span class="tag def-billing">
                            <%t SilverShop\Page\AccountPage_AddressBook.DefaultBillingAddress 'Default Billing Address' %>
                        </span>
                    <% end_if %>

                    <div class="panel-body">
                        <% include SilverShop\Model\Address %>
                    </div>

                    <div class="panel-footer cf">
                        <% if $ID != $CurrentMember.DefaultShippingAddressID %>
                            <a
                                title="<%t SilverShop\Page\AccountPage_AddressBook.MakeDefaultShippingTitle 'Make this my default shipping address' %>"
                                href="account/setdefaultshipping/{$ID}"
                                class="btn btn-primary"
                            >
                                <%t SilverShop\Page\AccountPage_AddressBook.MakeDefaultShipping 'Make Default Shipping' %>
                            </a>
                        <% end_if %>

                        <% if $ID != $CurrentMember.DefaultBillingAddressID %>
                            <a
                                title="<%t SilverShop\Page\AccountPage_AddressBook.MakeDefaultBillingTitle 'Make this my default billing address' %>"
                                href="account/setdefaultbilling/{$ID}"
                                class="btn btn-primary"
                            >
                                <%t SilverShop\Page\AccountPage_AddressBook.MakeDefaultBilling 'Make Default Billing' %>
                            </a>
                        <% end_if %>

                        <a
                            href="account/deleteaddress/{$ID}"
                            class="remove-address"
                            title="<%t SilverShop\Page\AccountPage_AddressBook.DeleteAddress 'Delete this address' %>"
                        >
                            <i class="fas fa-times"></i>
                        </a>
                    </div>
                </div>
            <% end_loop %>
        <% else %>
            <div class="alert alert-warning">
                <%t SilverShop\Page\AccountPage_AddressBook.NoAddress 'No addresses found.' %>
            </div>
        <% end_if %>

        <h2>
            <%t SilverShop\Page\AccountPage_AddressBook.CreateNewTitle 'Create New Address' %>
        </h2>

        $CreateAddressForm
    </div>
</div>
