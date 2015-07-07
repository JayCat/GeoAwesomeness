"use strict"

// fake poll location that would come from the backend 
// a.k.a. NASA Shuttle Landing Facility

// var pollLocation = {
// 	latitude: 28.6147072,
// 	longitude: -80.6929481
// }

var pollLocation = {
	latitude: 47.3725922,
	longitude: 8.5311246
}

var userId = '33';
var pollId = '3333';

var geoAwesomeness = new GeoAwesomeness();
geoAwesomeness.initialize( pollLocation, userId, pollId );