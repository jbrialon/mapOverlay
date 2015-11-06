/**
 * MapOverlay Object
 * Allow to show dynamic HTML
 *
 * @author jeremy.brialon@gmail.com
 */
define(['async!https://maps.googleapis.com/maps/api/js'], function() {

    /**
     * MapOverlay constructor
     * @param {Offset} oOffset specific offset definition, if not defined 0,0 is used
     */
    var MapOverlay = function (Offset) {
        var mapOverlay = new google.maps.OverlayView();

        mapOverlay.offset = {left: 0, top: 0};
        if( typeof Offset == 'object' )
        {
            mapOverlay.offset = {
                left: (typeof Offset.left == 'number')?Offset.left:0,
                top: (typeof Offset.top == 'number')?Offset.top:0
            };
        }

        mapOverlay.sContent = null;

        return mapOverlay;
    };

    //Extend OverlayView generic object
    MapOverlay.prototype = google.maps.OverlayView.prototype;
    _.extend(MapOverlay.prototype, {
        /**
         * Set the Overlay content
         * @param {String} Content
         */
        setContent: function (Content) {
            this.sContent = Content;
        },
        /**
         * Set the Overlay content
         * @param  {gmap marker} Marker
         */
        setPositionFromMarker: function(Marker) {
            if(Marker !== undefined)
                this.oPosition = Marker;
        },
        /**
         * Method called when item is added to the map
         */
        onAdd: function(){
            this.element = document.createElement('div');
            this.element.style.cssText = 'position:absolute;';
            this.element.innerHTML = this.sContent;

            var panes = this.getPanes();
            panes.floatPane.appendChild(this.element);
        },
        /**
         * Method called when map is drawed
         */
        draw: function(){
            //Position the Overlay
            if(this.oPosition !== undefined)
            {
                var oPixelPos = this.getProjection().fromLatLngToDivPixel(this.oPosition);
                if( typeof oPixelPos.x == 'number' && typeof oPixelPos.y == 'number' )
                {
                    this.element.style.left = (oPixelPos.x + this.offset.left - this.element.offsetWidth / 2) + 'px';
                    this.element.style.top = (oPixelPos.y + this.offset.top - this.element.offsetHeight) + 'px';
                }

                google.maps.event.trigger(this, 'loaded');
            }
        },
        /**
         * Method called when overlay is removed from map
         */
        onRemove: function(){
            if( this.element )
                this.element.parentNode.removeChild(this.element);

            google.maps.event.trigger(this, 'removed');
        }
    });

    return MapOverlay;
});