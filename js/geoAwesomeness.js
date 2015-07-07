"use strict"

var GeoAwesomeness = function () {
    
    // Constants
    var DEFAULT_ZOOM_LEVEL = 13;
    var DEFAULT_LATITUDE = 0;
    var DEFAULT_LONGITUDE = 0;

    var createNewPosition, setCenter, setMarker, initialize, initializeMap, initializeGeolocation, createMap,
        map, markers, pollLocation, properties, myId;

    pollLocation = {};
    markers = [];

    createNewPosition = function ( latitude, longitude ) {
        return new google.maps.LatLng( latitude, longitude );
    }

    setCenter = function ( latitude, longitude ) {
        map.setCenter( createNewPosition( latitude, longitude ) );
    }

    setMarker = function ( latitude, longitude, title ) {
        title = title ? title : 'Default title';
        var marker = new google.maps.Marker({
            position: createNewPosition( latitude, longitude ),
            map: map,
            title: title
        });
    }

    initializeMap = function () {
        var latitude = DEFAULT_LATITUDE, longitude = DEFAULT_LONGITUDE;
        if (pollLocation !== {}) {
            latitude = pollLocation.latitude;
            longitude = pollLocation.longitude;
        }

        var mapOptions = {
            zoom: DEFAULT_ZOOM_LEVEL,
            center: createNewPosition( latitude, longitude )
        };

        map = new google.maps.Map( document.getElementById( 'map-canvas' ), mapOptions );
    }

    initializeGeolocation = function () {
        if ("geolocation" in navigator) {
            var geolocationOptions = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            function success(position) {                
                setCenter( position.coords.latitude, position.coords.longitude )
                setMarker( position.coords.latitude, position.coords.longitude );
            };

            function error(err) {
                console.warn('ERROR(' + err.code + '): ' + err.message);
            };

            navigator.geolocation.getCurrentPosition(success, error, geolocationOptions);
        } 
        else {
            alert('Geolocation is not available');
        }
        // setTimeout(initializeGeolocation,4000);
    }

    createMap = function () {
        google.maps.event.addDomListener( window, 'load', initializeMap );
    }

    this.initialize = function ( initialLocation, userId ) {
        myId = userId;
        if ( pollLocation !== null && pollLocation !== 'undefined' ) {
            pollLocation = initialLocation;
        }
        createMap();
        initializeGeolocation();
    }
};



