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
    marker,
    Markers = new Array(),
    Infos = new Array();

    if(options.json) {
        coords = new google.maps.LatLng(options.coords[0], options.coords[1]);

        map = new google.maps.Map(self.get(0), $.extend(options, { center: coords }));
        if (options.showMarker == true) {
          marker = new google.maps.Marker({
              position: coords,
              map: map
          });
        };

        var json = $.parseJSON(options.json);
        $.each(json.markers, function(indice, marker) {
            Markers[indice] = new google.maps.Marker({
                position: new google.maps.LatLng(marker.lat, marker.lng),
                map: map,
                clickable: true,
                visible: true,
                title: marker.title
            });

            Infos[indice] = new google.maps.InfoWindow({
                content: marker.html
            });

            if (marker.image != undefined) {
                Markers[indice].icon = marker.image;
            }

            google.maps.event.addListener(Markers[indice], 'click', function() {
                Infos[indice].open(map, Markers[indice]);
            });
        });
    }

    else if(options.coords)
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
