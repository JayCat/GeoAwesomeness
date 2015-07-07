"use strict"

// fake poll location that would come from the backend 
// a.k.a. NASA Shuttle Landing Facility

var pollLocation = {
	latitude: 28.6147072,
	longitude: -80.6929481
}

var userId = 'MarioMario';

var geoAwesomeness = new GeoAwesomeness();
geoAwesomeness.initialize( pollLocation, userId );