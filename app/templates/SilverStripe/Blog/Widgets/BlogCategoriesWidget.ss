<% if $Categories %>
<div class="blog__categories">
	<ul class="list-unstyled list-inline">
		<% loop $Categories %>
			<li class="list-inline-item">
				<a href="$Link" class="<% if $Up.Controller.getParentController.CurrentCategory.ID == $ID %>active<% end_if %>">
					<span class="text">$Title</span>
				</a>
			</li>
		<% end_loop %>
		<% if $Controller.getParentController.CurrentCategory %>
			<li class="list-inline-item">
				<a href="$Controller.getParentController.Link" class="view-all">
					<span class="text">View All</span>
				</a>
			</li>
		<% end_if %>
	</ul>
</div>
<% end_if %>
