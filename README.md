# RageMP-ZoneManager
A very useful client-side system which let you create four squares or hexagons in any shape like colshapes which support Z axis

## Why i needed something like this
I was creating a traffic system which needed me to be able to check if a guy entered any crossroads and colshapes wasn't the thing i wanted + i wanted to sell farms by their shape and some of them wasn't shaped exaclty foursquare and i needed a little more, so i craeted this script to be able to make those things possible easily.



## Features
- You can create 4 types of zone which are defined az mp.zones.types in the script.
- You can loop through your zones and remove them.
- You can register zones by desired name.
- You may delete any zone any time.
- Server-side events also included.
- It supports Z axis which is still not very clever since it's not a big deal, all i needed was to prevent people to trigger some events from above the ground
- Have 4 testing functions which let you draw your zone on the map to see how it fits
- You can now register zones by any vector pointes above 2


## Functions (Client-Side)
``` 
/*
	Check if a zone is registered by it's name and it's dimension
*/
mp.zones.isZoneRegistered(zoneName, dimension)

/*
	Unregister a zone by it's name and dimension
*/
mp.zones.unRegisterZone(zoneName, dimension)

/*
	Register a zone by a list of vectors, height , zoneName, type, dimension
	Vectors: an arrayList of vectors depending on the type of the zone you are
	choosing to create for example if you are creating a 2PointZone all you need
	is 2 Vectors inside an array which are the starting point and the ending point
	and you have to pass height as -1 since it's not used in that type of zone
	if you are creating a 4PointZone you need to have an arrayList of vectors with
	4 Vectors inside and height is used this time, same as 4PointZone in 6PointZone
	you need to pass 6 vectors and the height.
	
	Returns ZoneObject (contains name, type, positions, and zone.data [which never used it my self])
*/
mp.zones.registerZone(Vectors, height, zoneName, type, dimension)


/*
	Get ZoneObject by it's name and dimension
*/
mp.zones.getZoneByName(zoneName, dimension)


/*
	Draw a 2PointZone for testing
	Requires 2 vectors
*/
mp.zones.drawZoneBy2(startPosition, endPosition)

/*
	Draw a 4PointZone for testing
	Requires 4 vectors and height
*/
mp.zones.drawZoneBy4(Vectors, height)

/*
	Draw a 6PointZone for testing
	Requires 6 vectors and height
*/
mp.zones.drawZoneBy6(Vectors, height)

/*
	Draw a NPointZone for testing
	Requires array of vectors and height
	Unlimited number of points supported by this code
*/
mp.zones.drawZoneByN(Vectors, height)

/*
	Check whether a point on the map is inside the zone or not
*/
mp.zones.isPointInZone(point, zoneName, dimension)

/*
	This is a list of registered zone names used for looping through zones
*/
mp.zones.registered 
```


## Events (Server-Side/Client-Side)

On client side the player parameter is mostly the local player it self.

```

/*
    mp.events.add('ZoneManager_PlayerEnterZone', (player, zoneName) => {
        //Your Code


    })
    mp.events.add('ZoneManager_PlayerExitZone', (player, zoneName) => {
        //Your Code

    })
*/

```

## Changelog
```
4/1/2020 - v0.0.1
- Added support for dimension
- Addes support for NPointZone type which let you create zones by any number of points
- Changed some functions to support dimensions, if you already used the script you may need to change them
- getZoneByName now returns undefined if the zone on the dimension does not exists (this thing existed before but i forgot to mention it before)

```