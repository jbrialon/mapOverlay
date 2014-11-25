mapOverlay
==========

override the default Overlay Object of google maps, can be used to display HTML infowindow on marker instead of default infowindow

###how to use :

```javascript

// init
var Overlay = new mapOverlay({
  'left': -125, // position
  'top': -50
});

// set HTML content
Overlay.setContent(infoWindow);

// set position
Overlay.setPositionFromMarker(marker.getPosition());

// attach on map
Overlay.setMap(map);

//clear overlay
Overlay.setMap(null);
```
