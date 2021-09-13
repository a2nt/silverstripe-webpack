<div id="$Name" class="form__field field<% if $extraClass %> $extraClass<% end_if %>">
	<% if $Title %><label class="field__label field__label-left left" for="$ID">$Title</label><% end_if %>

	<div class="field__content middleColumn">
		$Field
	</div>

	<% if $Title && $RightTitle %>
		<div class="field__label field__label-right right">$RightTitle</div>
	<% else_if $RightTitle %>
		<label class="field__label field__label-right right" for="$ID">$RightTitle</label>
	<% end_if %>

	<% if $Message %><span class="field__alert alert alert-{$MessageType} message $MessageType">$Message</span><% end_if %>
	<% if $Description %><span class="field__description description">$Description</span><% end_if %>
</div>
