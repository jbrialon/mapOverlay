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


###use with require.js :

```javascript
define(['mapOverlay'], function (MapOverlay) {

    this.overlay = new MapOverlay({
      'left': 0, // position
      'top': -15
    });

    // set HTML content
    this.overlay.setContent(infoWindow);

    // set position
    this.overlay.setPositionFromMarker(marker.getPosition());

    // attach on map
    this.overlay.setMap(this.map);
})}
```

dependancies :[require.js](http://requirejs.org/docs/download.html), [underscorejs](http://underscorejs.org/), [async plugin](https://github.com/millermedeiros/requirejs-plugins)

