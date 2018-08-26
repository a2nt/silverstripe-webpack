<nav class="account-nav">
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a href="{$Link}" class="nav-link<% if $Action == 'index' %> active<% end_if %>">
                <i class="fas fa-list"></i>
                <%t SilverShop\Page\AccountPage.PastOrders 'Past Orders' %>
            </a>
        </li>
        <li class="nav-item">
            <a href="{$Link('editprofile')}" class="nav-link<% if $Action == 'editprofile' %> active<% end_if %>">
                <i class="fas fa-user"></i>
                <%t SilverShop\Page\AccountPage.EditProfile 'Edit Profile' %>
            </a>
        </li>
        <li class="nav-item">
            <a href="{$Link('addressbook')}" class="nav-link<% if $Action == 'addressbook' %> active<% end_if %>">
                <i class="fas fa-book"></i>
                <%t SilverShop\Page\AccountPage.AddressBook 'Address Book' %>
            </a>
        </li>
        <li class="nav-item">
            <a href="Security/logout" class="nav-link">
                <i class="fas fa-sign-out-alt"></i>
                <%t SilverShop\Page\AccountPage.LogOut 'Log Out' %>
            </a>
        </li>
    </ul>
</nav>
