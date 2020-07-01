<div id="$HolderID" class="field<% if $extraClass %> $extraClass<% end_if %>">
	<% if $Title %><div class="left">$Title</div><% end_if %>
	<div class="middleColumn">
		$Field
	</div>
	<% if $RightTitle %><div class="right">$RightTitle</div><% end_if %>
	<% if $Message %><span class="message $MessageType">$Message</span><% end_if %>
	<% if $Description %><span class="description">$Description</span><% end_if %>
</div>
