<% if $Element %>
	<% with $Element %>
	    <div class="element $SimpleClassName.LowerCase<% if $StyleVariant %> $StyleVariant<% end_if %><% if $ExtraClass %> $ExtraClass<% end_if %>" id="$Anchor">
			<div class="element-container<% if $ContainerClass %> $ContainerClass<% end_if %>">
				$forTemplate
			</div>
		</div>
	<% end_with %>
<% end_if %>
