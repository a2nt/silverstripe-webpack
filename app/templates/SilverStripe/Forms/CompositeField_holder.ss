<$Tag $AttributesHTML>
	<% if $Tag == 'fieldset' && $Legend %>
		<legend class="form__legend">$Legend</legend>
	<% end_if %>

	$Field
</$Tag>
