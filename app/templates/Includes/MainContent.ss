<div class="mainContent-page-{$CSSClass}">
	<% if $HeroImageRecursive %>
	    <div class="element element__hero-image">
	        <div class="element-container">
	            <% include SlideItem Image=$HeroImageRecursive, SlideWidth='2140', SlideHeight='450' %>
	        </div>
	    </div>
	<% end_if %>

	<% if $URLSegment != 'home' %>
	    <div id="PageBreadcumbs" class="element element__breadcrumbs">
	        $Breadcrumbs
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
