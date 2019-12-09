<?php


namespace Site\Controllers;

use DNADesign\Elemental\Controllers\ElementController;
use Site\Templates\DeferedRequirements;

class MapElementController extends ElementController
{
    public function init()
    {
        parent::init();

        DeferedRequirements::loadCSS('https://api.tiles.mapbox.com/mapbox-gl-js/v0.48.0/mapbox-gl.css');
        DeferedRequirements::loadJS('https://api.tiles.mapbox.com/mapbox-gl-js/v0.48.0/mapbox-gl.js');

        DeferedRequirements::loadCSS('app_Site.Controllers.MapElementController.css');
        DeferedRequirements::loadJS('app_Site.Controllers.MapElementController.js');
    }
}
