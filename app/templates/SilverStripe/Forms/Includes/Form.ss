<% if $IncludeFormTag %>
<form $AttributesHTML>
<% end_if %>
	<% if $Message %>
	<div id="{$FormName}_error" class="form__message alert alert-{$MessageType} message $MessageType">$Message.RAW</div>
	<% else %>
	<div id="{$FormName}_error" class="form__message alert alert-{$MessageType} message {$MessageType}" style="display: none"></div>
	<% end_if %>

	<fieldset class="form__fieldset">
		<% if $Legend %><legend class="form__legend">$Legend</legend><% end_if %>
		<% loop $Fields %>
			$FieldHolder
		<% end_loop %>
		<div class="clear"><!-- --></div>
	</fieldset>

	<% if $Actions %>
	<div class="form__actions btn-toolbar">
		<% loop $Actions %>
			$Field
		<% end_loop %>
	</div>
	<% end_if %>
<% if $IncludeFormTag %>
</form>
<% end_if %>
