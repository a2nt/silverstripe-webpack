<nav id="{$NavID}" class="navbar navbar-expand-lg navbar-light bg-light">
    <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#{$NavID}Content"
            aria-controls="{$NavID}Content"
            aria-expanded="false"
            aria-label="Toggle navigation"
    >
        <i class="fas fa-bars"></i>
    </button>

    <div class="collapse navbar-collapse" id="{$NavID}Content">
        <ul class="navbar-nav mr-auto">
            <% loop $Navigation %>
                <% include NavItem %>
            <% end_loop %>
        </ul>
    </div>
</nav>
