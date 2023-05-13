<div
	id="$Anchor"
	class="element $SimpleClassName.LowerCase
		<%-- if $LinkedElement %> $LinkedElement.SimpleClassName.LowerCase<% end_if --%>
		<% if $StyleVariant %> $StyleVariant<% end_if %>
		<% if $ExtraClass %> $ExtraClass<% end_if %>"
>
	<div class="element__container<% if $ContainerClass %> $ContainerClass<% end_if %>">
		$Element
	</div>
</div>
