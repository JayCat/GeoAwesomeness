"use strict"

var GeoAwesomeness = function () {
    
    // Constants
    var DEFAULT_ZOOM_LEVEL = 13;
    var DEFAULT_LATITUDE = 0;
    var DEFAULT_LONGITUDE = 0;

    var createNewPosition, 
        setCenter, 
        setMarker, 
        initializeMap, 
        initializeGeolocation, 
        createMap,
        postAndUpdateMarkers,
        refreshMarkers,
        clearMarkers,
        setPollMarker,

        map, markers, pollLocation, myId, myPollId;

    map = {};
    markers = {}; // it's a hashmap of userId -> marker
    pollLocation = {};
    myId = 'DefaultUserID';
    myPollId = 1234;

    createNewPosition = function ( latitude, longitude ) {
        return new google.maps.LatLng( latitude, longitude );
    }

    setCenter = function ( latitude, longitude ) {
        map.setCenter( createNewPosition( latitude, longitude ) );
    }

    setMarker = function ( latitude, longitude, userId, title ) {
        title = title ? title : 'Default title';
        var marker = new google.maps.Marker({
            position: createNewPosition( latitude, longitude ),
            map: map,
            title: title
        });
        markers[userId] = marker;
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
        setPollMarker();
    }

    initializeGeolocation = function () {
        if ("geolocation" in navigator) {
            var geolocationOptions = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            function success(position) {   
                postAndUpdateMarkers( position.coords.latitude, position.coords.longitude );
            };

            function error(err) {
                console.warn('ERROR(' + err.code + '): ' + err.message);
            };

            navigator.geolocation.getCurrentPosition(success, error, geolocationOptions);
        } 
        else {
            alert('Geolocation is not available');
        }
        setTimeout(initializeGeolocation,4000);
    }

    createMap = function () {
        google.maps.event.addDomListener( window, 'load', initializeMap );
    }

    postAndUpdateMarkers = function ( latitude, longitude ) {
        // post marker coords + userId and retrieve all markers
        var success, error;
        success = function ( updatedMarkers ) {
            clearMarkers();
            markers = updatedMarkers;
            refreshMarkers();
        }
        error = function () {
            alert('There was an error :(');
        }

        var data = { 
            id: myId,
            poll: myPollId,
            latitude: latitude,
            longitude: longitude,
        };

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:4000/mylocation",
            data: data,
            success: success,
            error: error,
            dataType: "json"
        });
    }

    refreshMarkers = function () {
        for (var userId in markers) {
            var marker = markers[userId];
            setMarker( marker.latitude, marker.longitude, userId );
        }
    }

    clearMarkers = function () {
        for (var markerIndex in markers) {
            markers[markerIndex].setMap(null);
        }
    }

    setPollMarker = function () {
        var marker = new google.maps.Marker({
            position: createNewPosition( pollLocation.latitude, pollLocation.longitude ),
            map: map,
            title: "Poll Meeting",
            icon: "img/blueMarker.png"
        });
    }

    this.initialize = function ( initialLocation, userId ) {
        if ( userId !== null && userId !== 'undefined' ) {
            myId = userId;
        }
        if ( pollLocation !== null && pollLocation !== 'undefined' ) {
            pollLocation = initialLocation;
        }
        if ( pollId !== null && pollId !== 'undefined' ) {
            myPollId = pollId;
        }
        createMap();
        initializeGeolocation();
    }
};