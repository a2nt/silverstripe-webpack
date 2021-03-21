<% if $ShowTitle %>
    <h2 class="element__title">$Title</h2>
<% end_if %>

<div class="element__content" data-listelement-count="{$Elements.Elements.Count}">
	<div id="ElementAccordion{$Elements.ID}" class="accordion">
	    $Accordion
	</div>
</div>
