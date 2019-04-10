<% with $SiteConfig %>
<div class="container">
    <h2>Contact Us</h2>
    <div class="field row">
        <div class="title col-sm-4">Address:</div>
        <div class="value col-sm-8">$Address</div>
    </div>

    <div class="field row">
        <div class="title col-sm-4">Phone:</div>
        <div class="value col-sm-8">$PhoneNumber</div>
    </div>

    <div class="field row">
        <div class="title col-sm-4">Email:</div>
        <div class="value col-sm-8">$PublicEmail</div>
    </div>

    <% include Objects\SocialLinks %>
</div>

<div class="copyright">
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
