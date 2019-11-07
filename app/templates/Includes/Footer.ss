<% with $SiteConfig %>
<div class="wrapper">
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <a href="/" class="logo2">
                    <img src="$ResourcesURL('logo2.png')" alt="National Children's Alliance" />
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
                <a href="/" target="_blank" class="external-link">
                    <img src="$ResourcesURL('logo-alliance.png')" alt="National Children's Alliance" />
                </a>
                <a href="/" target="_blank" class="external-link">
                    <img src="$ResourcesURL('logo-regional.png')" alt="National Children's Alliance" />
                </a>
            </div>
        </div>
    </div>
</div>

<div class="copyright footer">
    <div class="container">
        <div class="text-right hotline">
            Child Abuse Hotline <a href="calto:+18003423720" class="tel">1-800-342-3720</a>
        </div>
        <%-- div class="row">
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
        </div --%>
    </div>
</div>
<% end_with %>
