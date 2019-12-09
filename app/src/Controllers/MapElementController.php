<?php


namespace Site\Controllers;

use DNADesign\Elemental\Controllers\ElementController;
use Site\Templates\DeferredRequirements;

class MapElementController extends ElementController
{
    public function init()
    {
        parent::init();

        DeferredRequirements::loadCSS('https://api.tiles.mapbox.com/mapbox-gl-js/v0.48.0/mapbox-gl.css');
        DeferredRequirements::loadJS('https://api.tiles.mapbox.com/mapbox-gl-js/v0.48.0/mapbox-gl.js');

        DeferredRequirements::loadCSS('app_Site.Controllers.MapElementController.css');
        DeferredRequirements::loadJS('app_Site.Controllers.MapElementController.js');
    }
}
