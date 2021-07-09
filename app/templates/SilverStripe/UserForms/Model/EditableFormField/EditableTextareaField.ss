<textarea $AttributesHTML
	<% if $RightTitle %>aria-describedby="{$Name}_right_title"<% end_if %>
	placeholder="<% if $Placeholder %>{$Placeholder}<% else %>{$Title}<% end_if %>"
>$Value</textarea>
