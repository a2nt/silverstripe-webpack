<% with $SiteConfig %>
<div class="wrapper">
    <div class="element">
        <div class="footer__container $Top.DefaultContainer">
            <div class="row">
                <div class="col-sm-6">
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
                </div>
                <div class="col-sm-6 text-right">

                </div>
            </div>
        </div>
    </div>
</div>

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
