<div class="page-content container">
    <div class="checkout element">
        <% include Content %>

        <div class="membership">
            $Form
        </div>

        <div class="login">
            <h2><%t SilverStripe\Security\Security.LOGIN 'Log In' %></h2>
            $LoginForm
        </div>
    </div>
</div>
