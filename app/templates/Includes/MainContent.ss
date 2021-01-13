<div class="maincontent maincontent-{$CSSClass} maincontent-{$URLSegment}<% if $URLSegment != 'home' %> maincontent-inner-page<% end_if %>">
	<% if $HeroImageRecursive %>
	    <div class="element element__hero-image">
	        <div class="element-container">
	            <% include SlideItem Image=$HeroImageRecursive, SlideWidth='2140', SlideHeight='450' %>
	        </div>
	    </div>
	<% end_if %>

	<% if $ParentID %>
	    <div id="PageBreadcumbs">
	        $Breadcrumbs
	    </div>
	<% else_if $URLSegment != 'home' %>
	    <div id="PageBreadcumbs">
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
	                	<div class="{$DefaultContainer}">
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
	    </div>
	<% else %>
	    <div class="content-holder">
	        $Layout
	    </div>
	<% end_if %>
</div>
