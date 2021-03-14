<% if $ShowTitle %>
    <h2 class="list-element__title">$Title</h2>
<% end_if %>
<div class="accordion-element__container" data-listelement-count="$Elements.Elements.Count">
	<div id="ElementAccordion{$Elements.ID}" class="accordion">
	    $Accordion
	</div>
</div>
