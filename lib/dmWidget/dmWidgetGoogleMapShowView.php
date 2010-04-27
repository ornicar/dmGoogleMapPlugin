<?php

class dmWidgetGoogleMapShowView extends dmWidgetPluginView
{

  public function configure()
  {
    parent::configure();
    
    $this->addRequiredVar(array(
      'address',
      'json',
      'mapTypeId',
      'zoom',
      'navigationControl',
      'mapTypeControl',
      'scaleControl',
      'width',
      'height'));
  }

  protected function doRender()
  {
    $vars = $this->getViewVars();

    $map = $this->getService('google_map_helper')->map()
    ->address($vars['address'])
    ->json($vars['json'])
    ->mapTypeId($vars['mapTypeId'])
    ->zoom($vars['zoom'])
    ->style(sprintf(
      'width: %s; height: %s;',
      dmArray::get($vars, 'width', '100%'),
      dmArray::get($vars, 'height', '300px')
    ))
    ->navigationControl($vars['navigationControl'])
    ->mapTypeControl($vars['mapTypeControl'])
    ->scaleControl($vars['scaleControl'])
    ->splash($vars['splash']);

    $this
    ->addJavascript($map->getJavascripts())
    ->addStylesheet($map->getStylesheets());

    return $map;
  }
  
  protected function doRenderForIndex()
  {
    $vars = $this->getViewVars();
    
    return $vars['address'];
  }

}
