<div id="$HolderID" class="field<% if $extraClass %> $extraClass<% end_if %>">
	<% if $Title %><label class="left" for="$ID">$Title</label><% end_if %>

	<div class="middleColumn">
		$Field
	</div>

	<% if $Title && $RightTitle %>
		<div class="right">$RightTitle</div>
	<% else_if $RightTitle %>
		<label class="right" for="$ID">$RightTitle</label>
	<% end_if %>

	<% if $Message %><span class="message $MessageType">$Message</span><% end_if %>
	<% if $Description %><span class="description">$Description</span><% end_if %>
</div>
