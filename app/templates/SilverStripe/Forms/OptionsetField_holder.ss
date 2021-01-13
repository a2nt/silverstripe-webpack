<div id="$HolderID" class="form__field field<% if $extraClass %> $extraClass<% end_if %>">
	<% if $Title %><div class="field__label field__label-left left">$Title</div><% end_if %>
	<div class="field__content middleColumn">
		$Field
	</div>
	<% if $RightTitle %><div class="field__label field__label-right right">$RightTitle</div><% end_if %>
	<% if $Message %><span class="field__alert alert alert-{$MessageType} message $MessageType">$Message</span><% end_if %>
	<% if $Description %><span class="field__description description">$Description</span><% end_if %>
</div>
