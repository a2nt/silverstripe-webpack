<div class="container page-content">
	<div class="element account">
		<% include SilverShop\Includes\AccountNavigation %>

		<div class="row">
			<div class="col-sm-6">
				<h2><%t SilverShop\Page\AccountPage.Title 'My Account' %></h2>
				<div class="card memberdetails">
					<div class="card-body">
						<div class="card-text">
						    <% with $CurrentMember %>
						        <dl>
						            <dt><%t SilverShop\Page\AccountPage.MemberName 'Name' %></dt>
						            <dd>$Name</dd>

						            <dt><%t SilverShop\Page\AccountPage.MemberEmail 'Email' %></dt>
						            <dd>$Email</dd>

						            <dt><%t SilverShop\Page\AccountPage.MemberSince 'Member Since' %></dt>
						            <dd>$Created.Nice</dd>

						            <%-- dt><%t SilverShop\Page\AccountPage.MemberLastVisit 'Last Visit' %></dt>
						            <dd>$LastVisited.Nice</dd --%>

						            <dt> <%t SilverShop\Page\AccountPage.NumberOfOrders 'Number of orders' %></dt>
						            <dd><% if $PastOrders %>{$PastOrders.Count}<% else %>0<% end_if %></dd>
						        </dl>
						    <% end_with %>
						</div>
					</div>
				</div>

				$ChangePasswordForm
			</div>
			<div class="col-sm-6">
				<h2 class="pagetitle">
			        <%t SilverShop\Page\AccountPage_EditProfile.Title 'Edit Profile' %>
			    </h2>

			    $EditAccountForm
			</div>
		</div>
	</div>
</div>
