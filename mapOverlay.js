/**
 * MapOverlay Object
 * Allow to show dynamic HTML
 *
 * @author jeremy.brialon@gmail.com
 */
(function() {

	/**
	 * MapOverlay constructor
	 * @param {Object} oOffset specific offset definition, if not defined 0,0 is used
	 */
	mapOverlay = function( oOffset ) {
		this.offset = {left: 0, top: 0};
		if( typeof oOffset == 'object' )
			this.offset = {
				left: (typeof oOffset.left == 'number')?oOffset.left:0,
				top: (typeof oOffset.top == 'number')?oOffset.top:0
			}

		this.sContent = null;
		return this;
	};

	//Extend OverlayView generic object
	mapOverlay.prototype = new google.maps.OverlayView();

	/**
	 * Set the Overlay content
	 * @param {String} sContent
	 */
	mapOverlay.prototype.setContent = function( sContent ) {
		this.sContent = sContent;
	};

	/**
	 * Set the Overlay content
	 * @param  {gmap marker} oMarker
	 */
	mapOverlay.prototype.setPositionFromMarker = function( oMarker ) {
		this.oPosition = oMarker;
	};

	/**
	 * Method called when item is added to the map
	 */
	mapOverlay.prototype.onAdd = function() {
		this.element = document.createElement('div');
		this.element.style.cssText = 'position:absolute;';
		this.element.innerHTML = this.sContent;

		// We'll add this overlay to the floatPane pane (at the top pane).
		var panes = this.getPanes();
		panes.floatPane.appendChild(this.element);
	};

	/**
	 * Method called when map is drawed
	 */
	mapOverlay.prototype.draw = function() {
		//Position the Overlay
		var oPixelPos = this.getProjection().fromLatLngToDivPixel(this.oPosition);
		if( typeof oPixelPos.x == 'number' && typeof oPixelPos.y == 'number' )
		{
			this.element.style.left = (oPixelPos.x + this.offset.left - this.element.offsetWidth / 2) + 'px';
			this.element.style.top = (oPixelPos.y + this.offset.top - this.element.offsetHeight) + 'px';
		}

		google.maps.event.trigger(this, 'loaded');
	};

	/**
	 * Method called when overlay is removed from map
	 */
	mapOverlay.prototype.onRemove = function() {
		if( this.element )
			this.element.parentNode.removeChild(this.element);

		google.maps.event.trigger(this, 'removed');
	};

}).call(this);