<div class="wrapper">
    <div class="element">
        <div class="footer__container $DefaultContainer">
            <% with $SiteConfig %>
                <div class="field">
                    <div class="fn">$Title</div>
                    <% if $Address %>
                        <address>
                            $Address<br/>
                            $Suburb, $State $ZipCode
                        </address>
                    <% end_if %>
                </div>

                <% if $PhoneNumber %>
                    <div class="field">
                        $PhoneNumber
                    </div>
                <% end_if %>

                <% if $PublicEmail %>
                    <div class="field">
                        $PublicEmail
                    </div>
                <% end_if %>

                <% include Objects\SocialLinks %>
            <% end_with %>
            
            <% include LocaleMenu %>
        </div>
    </div>
</div>

<% with $SiteConfig %>
<div class="copyright footer">
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                Copyright &copy; {$Top.CurrentTime.Format("Y")} {$Title} All rights reserved.
            </div>
            <div class="col-sm-6">
                <% if $PrivacyPolicy %>
                    <a href="$PrivacyPolicy.Link">$PrivacyPolicy.Title</a>
                <% end_if %>
                <% if $Sitemap %>
                    <a href="$Sitemap.Link">$Sitemap.Title</a>
                <% end_if %>
            </div>
        </div>
    </div>
</div>
<% end_with %>
