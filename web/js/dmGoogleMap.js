(function($)
{
	$.fn.dmGoogleMap = function(opt)
  {
    if(typeof google == "undefined" || typeof google.maps == "undefined")
    {
      alert('Please reload the page to activate the map');
      return this;
    }
    
    var
    self = this,
    options = $.extend({
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.HYBRID
    }, self.metadata(), opt || {}),
    map,
    marker;

    if(options.coords)
    {
      coords = new google.maps.LatLng(options.coords[0], options.coords[1]);
      
      map = new google.maps.Map(self.get(0), $.extend(options, { center: coords }));
      marker = new google.maps.Marker({
        position: coords,
        map: map
      });
    }
    else if(options.address)
    {
      geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: options.address }, function(results, status)
      {
        found = false;

        if (status == google.maps.GeocoderStatus.OK && results.length)
        {
          if (status != google.maps.GeocoderStatus.ZERO_RESULTS)
          {
            map = new google.maps.Map(self.get(0), $.extend(options, { center: results[0].geometry.location }));

            marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map
            });

            found = true;
          }
        }

        if(!found)
        {
          self.text('Sorry, the address "'+options.address+'" can not be found');
        }
      });
    }

    return this;
  }
})(jQuery);