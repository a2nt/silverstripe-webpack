<% if $ElementFilteredControllers %>
	<% loop $ElementFilteredControllers %>
		<div class="card">
			<div
				id="ElementHeader{$ID}"
				class="card-header accordion-header a h4"
				data-toggle="collapse"
				data-target="#ElementContent{$ID}"
				aria-expanded="false"
				aria-controls="ElementContent{$ID}"
			>
				$Title
			</div>

			<div
				id="ElementContent{$ID}"
				class="accordion-content collapse"
				aria-labelledby="ElementHeader{$ID}"
				data-parent="#ElementAccordion{$Parent.ID}"
			>
				$Me
			</div>
		</div>
	<% end_loop %>
<% end_if %>
