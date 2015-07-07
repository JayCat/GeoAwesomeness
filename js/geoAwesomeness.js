"use strict"

var GeoAwesomeness = function () {
    
    var createNewPosition, setCenter, setMarker, initialize, initializeMap,
        map, properties;

    properties = {
        latitude: 0,
        longitude: 0
    };

    createNewPosition = function ( lat, lng ) {
        return new google.maps.LatLng( lat, lng );
    }

    setCenter = function ( lat, lng ) {
        map.setCenter( createNewPosition( lat, lng ) );
    }

    setMarker = function ( lat, lng, title ) {
        title = title ? title : 'Default title';
        var marker = new google.maps.Marker({
            position: createNewPosition( lat, lng ),
            map: map,
            title: title
        });
    }

    initializeMap = function () {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                position.latitude = position.coords.latitude;
                position.longitude = position.coords.longitude;
                var mapOptions = {
                    zoom: 8,
                    center: createNewPosition( position.latitude, position.longitude )
                };
                map = new google.maps.Map( document.getElementById( 'map-canvas' ), mapOptions );
                setMarker( position.latitude, position.longitude );
            });
        } else {
            alert('Geolocation is not available');
        }
    }

    this.initialize = function () {
        google.maps.event.addDomListener( window, 'load', initializeMap );
    }
};
