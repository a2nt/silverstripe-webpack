<% if $Title && $ShowTitle %><h2 class="element__title">$Title</h2><% end_if %>

<% if $EmbeddedObject %>
    <div class="row element__oembed__object">
        <div class="col-md-12 card">
            $EmbeddedObject
            <div class="card-body">
                <% if $EmbeddedObject.Title %><h3 class="card-title">$EmbeddedObject.Title</h3><% end_if %>
                <% if $EmbeddedObject.Description %><p class="card-text">$EmbeddedObject.Description</p><% end_if %>
            </div>
        </div>
    </div>
<% else_if $VideoFile %>
	<% with $VideoFile %>
	<video controls autoplay="true" muted="true" loop="true" width="100%">
		<source src="{$Link}" type="video/mp4">
		Download the
		<a href="{$Link}">video</a>.
	</video>
	<% end_with %>
<% end_if %>
