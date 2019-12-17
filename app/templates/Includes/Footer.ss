<% with $SiteConfig %>
<div class="wrapper">
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <a href="/" class="logo2">
                    <img src="$ResourcesURL('logo2.png')" alt="{$Title}" />
                </a>

                <div class="field">
                    <div class="fn">$Title</div>
                    <address>
                        $Address<br/>
                        $Suburb, $State $ZipCode
                    </address>
                </div>

                <div class="field">
                    T: $PhoneNumber
                </div>

                <% if $PublicEmail %>
                    <div class="field">
                        E: $PublicEmail
                    </div>
                <% end_if %>

                <% include Objects\SocialLinks %>
            </div>
            <div class="col-sm-6 text-right">

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
