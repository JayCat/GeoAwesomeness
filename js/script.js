var map;

function createNewPosition (lat, lng) {
    return new google.maps.LatLng(lat,lng);
}

function setCenter (lat,lng) {
    map.setCenter(createNewPosition(lat,lng));
}

function setMarker (lat, lng, title) {
    title = title ? title : 'Default title';
    var marker = new google.maps.Marker({
        position: createNewPosition(lat,lng),
        map: map,
        title: title
    });
}

function initialize () {
	var latitude = 0, longitude = 0;
	if ("geolocation" in navigator) {
		/* geolocation is available */
		navigator.geolocation.getCurrentPosition(function(position) {
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;
            var mapOptions = {
                zoom: 8,
                center: createNewPosition(latitude, longitude)
            };
            map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);
            setMarker(latitude,longitude);
		});
	} else {
		/* geolocation IS NOT available */
	}
}

google.maps.event.addDomListener(window, 'load', initialize);