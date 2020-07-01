<img src="$Image.Fill(432,315).URL" alt="$Title" />
<% if $Link %>
    <% with $Link %>
    <a href="$URL"<% if $OpenInNewWindow %> target="_blank"<% end_if %> class="stretched-link">
        <span class="sr-only">$Up.Title</span>
    </a>
    <% end_with %>
<% end_if %>
