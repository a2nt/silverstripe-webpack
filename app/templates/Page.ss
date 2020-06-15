<!DOCTYPE html>
<html lang="$ContentLocale.ATT" dir="$i18nScriptDirection.ATT">
<%--  manifest="/cache.appcache" --%>
<head>
    <% include MetaHead %>
</head>

<body oncontextmenu="return false;"<% with $SiteConfig %> data-default-lng="$Longitude" data-default-lat="$Latitude"<% end_with %>>
	<% include First %>

    <div class="wrapper">
        <header id="Header">
            <% include Header %>
        </header>

        <main id="MainContent" data-ajax-region="LayoutAjax">
            <% if $ParentID %>
                <div id="PageBreadcumbs">
                    $Breadcrumbs
                </div>
            <% else_if $URLSegment != 'home' %>
                <div id="PageBreadcumbs">
                    $URLSegment
                    <nav class="breadcrumbs $DefaultContainer" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="/">Home</a>
                            </li>

                            <li class="breadcrumb-item current active" aria-current="page">
                                <a href="$Link" class="breadcrumb-2">
                                    $MenuTitle
                                </a>
                            </li>
                        </ol>
                    </nav>
                </div>
            <% end_if %>

            <% if $SideBarContent || $SideBarView && $SideBarView.Widgets.Count %>
                <div class="content-holder content-holder__sidebar">
                    <div class="{$DefaultContainer}">
                        <div class="row">
                            <div class="col-md-9 layout__col">
                                $Layout
                            </div>
                            <div class="col-md-3 sidebar__col">
                                <div class="page-content-sidebar page-content jsSidebarUI">
                                    <div class="jsSidebarUI__inner">
                                        $SideBarContent
                                        $SideBarView
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <% else %>
                <div class="content-holder">
                    $Layout
                </div>
            <% end_if %>
        </main>
    </div>

    <footer id="Footer" class="site-footer footer">
        <% include Footer %>
    </footer>

    <% include Last %>
</body>
</html>
