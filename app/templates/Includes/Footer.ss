<% with $SiteConfig %>
<div class="container">
    <div class="row">
        <div class="col-md-4">
            <div class="col">
                <h2>About Us</h2>
                <div class="typography short-description">
                    $ShortDescription
                </div>
            </div>
        </div>
        <div class="col-md-2">
            <div class="col">
                <h2>Services</h2>
                <ul class="links">
                    <% loop $Services %>
                        <li>
                            <a href="{$Link}">$Title</a>
                        </li>
                    <% end_loop %>
                </ul>
            </div>
        </div>
        <div class="col-md-2">
            <div class="col">
                <h2>Quick Links</h2>
                <ul class="links">
                <% loop $QuickLinks %>
                    <li>
                        <a href="{$Link}">$Title</a>
                    </li>
                <% end_loop %>
                </ul>
            </div>
        </div>
        <div class="col-md-4">
            <div class="col">
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
        </div>
    </div>
</div>
<% end_with %>

<div class="copyright">
    <div class="container">
        Copyright &copy; {$CurrentTime.Format("Y")} All rights reserved.
    </div>
</div>