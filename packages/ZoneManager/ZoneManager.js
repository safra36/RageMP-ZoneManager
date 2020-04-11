
mp.zones = {};
mp.zones.registered = [];

mp.zones.types = {
    "2PointZone":1,
    "4PointZone":2,
    "6PointZone":3,
    "NPointZone":4
}



mp.zones.isZoneRegistered = (zoneName, dimension) => {

    for(i in mp.zones.registered)
    {
        var ZoneManagerObject = mp.zones.registered[i];
        if(ZoneManagerObject.zoneName == zoneName && ZoneManagerObject.dimension == dimension)
        {
            return true;
        }
    }

    return false;
}

mp.zones.getZoneByName = (zoneName, dimension) => {

    for(i in mp.zones.registered)
    {
        var ZoneManagerObject = mp.zones.registered[i];
        if(ZoneManagerObject.zoneName == zoneName && ZoneManagerObject.dimension == dimension)
        {
            return ZoneManagerObject;
        }
    }

    return undefined;
}

// Unregister a zone by zonename
// Returns True On Success False on ZoneName Not Found
mp.zones.unRegisterZone = (zoneName, dimension) => {

    for(i in mp.zones.registered)
    {
        var ZoneManagerObject = mp.zones.registered[i];
        if(ZoneManagerObject.zoneName == zoneName && ZoneManagerObject.dimension == dimension)
        {
            mp.players.call('ZoneManager_UnregisterZone', [zoneName, dimension])
            mp.zones.registered.splice(i, 1);
            return true;
        }
    }

    return false;

}

// Register a Zone By Name and Type
// Vector is an array of vectors which is defined and used on type
mp.zones.registerZone = (Vectors, height, zoneName, type, dimension) => {


    for(i in mp.zones.registered)
    {
        var ZoneManagerObject = mp.zones.registered[i];
        if(ZoneManagerObject.zoneName == zoneName && ZoneManagerObject.dimension == dimension)
        {
            return undefined;
        }
    }

    if(type == mp.zones.types["2PointZone"])
    {
        var ZoneObject = {};
        ZoneObject.firstvec = Vectors[0];
        ZoneObject.secondvec = Vectors[1];
        ZoneObject.collieded = false;
        ZoneObject.zoneName = zoneName;
        ZoneObject.type = mp.zones.types["2PointZone"];
        ZoneObject.dimension = dimension;
        ZoneObject.data = {};

        mp.players.call('ZoneManager_RegisterZone', [ZoneObject]);
        mp.zones.registered.push(ZoneObject);
        return ZoneObject;
    }
    else if(type == mp.zones.types["4PointZone"])
    {
        var ZoneObject = {};
        ZoneObject.firstvec = Vectors[0];
        ZoneObject.secondvec = Vectors[1];;
        ZoneObject.thirdvec = Vectors[2];;
        ZoneObject.forthvec = Vectors[3];;
        ZoneObject.height = height;
        ZoneObject.collieded = false;
        ZoneObject.zoneName = zoneName;
        ZoneObject.type = mp.zones.types["4PointZone"];
        ZoneObject.dimension = dimension;
        ZoneObject.data = {};

        mp.players.call('ZoneManager_RegisterZone', [ZoneObject]);
        mp.zones.registered.push(ZoneObject);
        return ZoneObject;
    }
    else if(type == mp.zones.types["6PointZone"])
    {
        var ZoneObject = {};
        ZoneObject.firstvec = Vectors[0];
        ZoneObject.secondvec = Vectors[1];;
        ZoneObject.thirdvec = Vectors[2];;
        ZoneObject.forthvec = Vectors[3];;
        ZoneObject.fifthvec = Vectors[4];;
        ZoneObject.sixthvec = Vectors[5];;
        ZoneObject.height = height;
        ZoneObject.collieded = false;
        ZoneObject.zoneName = zoneName;
        ZoneObject.type = mp.zones.types["6PointZone"];
        ZoneObject.dimension = dimension;
        ZoneObject.data = {};

        mp.players.call('ZoneManager_RegisterZone', [ZoneObject]);
        mp.zones.registered.push(ZoneObject);
        return ZoneObject;
    }
    else if(type == mp.zones.types["NPointZone"])
    {
        if(Vectors.length > 2)
        {
            var ZoneObject = {};
            ZoneObject.vectors = Vectors;
            ZoneObject.height = height;
            ZoneObject.collieded = false;
            ZoneObject.zoneName = zoneName;
            ZoneObject.type = mp.zones.types["NPointZone"];
            ZoneObject.dimension = dimension;
            ZoneObject.data = {};

            mp.players.call('ZoneManager_RegisterZone', [ZoneObject]);
            mp.zones.registered.push(ZoneObject);
            return ZoneObject;
        }
        else
        {
            return undefined;
        }
    }
    else
    {
        return undefined;
    }

}



mp.zones.isPointInZone = (point, zoneName, dimension) => {

    for(i in mp.zones.registered)
    {
        var ZoneObject = mp.zones.registered[i];

        if(ZoneObject.zoneName == zoneName && ZoneObject.dimension == dimension)
        {
            //Got ya
            var ZoneType = ZoneObject.type;
            if(ZoneType == mp.zones.types["NPointZone"])
            {

                var PointVector = point;
                var ZoneHeight = ZoneObject.height;
                var Vectors = ZoneObject.vectors;

                var pointInside = [PointVector.x, PointVector.y];
                var ShapeCoords = [];

                for(i in Vectors)
                {
                    var VectorObject = Vectors[i];

                    var VectorObjectZ = VectorObject.z;
                    var VectorObjectZ_Height = VectorObject.z + parseFloat(ZoneHeight);

                    if(PointVector.z > VectorObjectZ && PointVector.z < VectorObjectZ_Height)
                    {
                        var AddingVec = [VectorObject.x, VectorObject.y];
                        ShapeCoords.push(AddingVec);
                        continue;
                    }
                    else
                    {
                        return false;
                    }

                }

                //Okay Z Axis is okay, go for the other shets ...
                if(this.inside(pointInside, ShapeCoords))
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
            else if(ZoneType == mp.zones.types["6PointZone"])
            {
                // mp.gui.chat.push(`DO I EVEN GET CALLED?`);
                var FirstVector = ZoneObject.firstvec;
                var SecondVector = ZoneObject.secondvec;
                var ThirdVector = ZoneObject.thirdvec;
                var ForthVector = ZoneObject.forthvec;
                var FifthVector = ZoneObject.fifthvec;
                var SixthVector = ZoneObject.sixthvec;
                var ZoneHeight = ZoneObject.height;
                var PointVector = point;
                var ZFirstVector = FirstVector.z;
                var ZFirstVector_Height = FirstVector.z + parseFloat(ZoneHeight);
                var ZSecondVector = SecondVector.z;
                var ZSecondVector_Height = SecondVector.z + parseFloat(ZoneHeight);
                var ZThirdVector = ThirdVector.z;
                var ZThirdVector_Height = ThirdVector.z + parseFloat(ZoneHeight);
                var ZForthVector = ForthVector.z;
                var ZForthVector_Height = ForthVector.z + parseFloat(ZoneHeight);
                var ZFifthVector = FifthVector.z;
                var ZFifthVecotr_Height = FifthVector.z + parseFloat(ZoneHeight);
                var ZSixthVector = SixthVector.z;
                var ZSixthVector_Height = SixthVector.z + parseFloat(ZoneHeight);

                if(PointVector.z > ZFirstVector && PointVector.z < ZFirstVector_Height || 
                    PointVector.z > ZSecondVector && PointVector.z < ZSecondVector_Height || 
                    PointVector.z > ZThirdVector && PointVector.z < ZThirdVector_Height || 
                    PointVector.z > ZForthVector && PointVector.z < ZForthVector_Height || 
                    PointVector.z > ZFifthVector && PointVector.z < ZFifthVecotr_Height || 
                    PointVector.z > ZSixthVector && PointVector.z < ZSixthVector_Height)
                {

                    var pointInside = [PointVector.x, PointVector.y];
                    var ShapeCoords = [[FirstVector.x, FirstVector.y], [SecondVector.x, SecondVector.y], [ThirdVector.x, ThirdVector.y], [ForthVector.x, ForthVector.y], [FifthVector.x, FifthVector.y], [SixthVector.x, SixthVector.y]];

                    if(this.inside(pointInside, ShapeCoords))
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }

                }
                else
                {

                    return false;
                }
            }
            else if(ZoneType == mp.zones.types["4PointZone"])
            {
                var FirstVector = ZoneObject.firstvec;
                var SecondVector = ZoneObject.secondvec;
                var ThirdVector = ZoneObject.thirdvec;
                var ForthVector = ZoneObject.forthvec;
                var ZoneHeight = ZoneObject.height;
                var PointVector = point;
                var ZFirstVector = FirstVector.z;
                var ZFirstVector_Height = FirstVector.z + parseFloat(ZoneHeight);
                var ZSecondVector = SecondVector.z;
                var ZSecondVector_Height = SecondVector.z + parseFloat(ZoneHeight);
                var ZThirdVector = ThirdVector.z;
                var ZThirdVector_Height = ThirdVector.z + parseFloat(ZoneHeight);
                var ZForthVector = ForthVector.z;
                var ZForthVector_Height = ForthVector.z + parseFloat(ZoneHeight);

                if(PointVector.z > ZFirstVector && PointVector.z < ZFirstVector_Height || 
                    PointVector.z > ZSecondVector && PointVector.z < ZSecondVector_Height || 
                    PointVector.z > ZThirdVector && PointVector.z < ZThirdVector_Height || 
                    PointVector.z > ZForthVector && PointVector.z < ZForthVector_Height)
                {

                    var pointInside = [PointVector.x, PointVector.y];
                    var ShapeCoords = [[FirstVector.x, FirstVector.y], [SecondVector.x, SecondVector.y], [ThirdVector.x, ThirdVector.y], [ForthVector.x, ForthVector.y]];

                    if(this.inside(pointInside, ShapeCoords))
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }

                }
                else
                {
                    return false;
                }
            }
            else if(ZoneType == mp.zones.types["2PointZone"])
            {
                var FirstVector = ZoneObject.firstvec;
                var SecondVector = ZoneObject.secondvec;
                var PointVector = ZoneManager_Player.position;

                if(FirstVector.x > SecondVector.x)
                {
                    if(PointVector.x < FirstVector.x && SecondVector.x < PointVector.x)
                    {
                        // X Vector Is Between.

                        if(FirstVector.y > SecondVector.y)
                        {
                            if(PointVector.y < FirstVector.y && SecondVector.y < PointVector.y)
                            {
                                // Y Vector Is Between.
                                
                                if(FirstVector.z > SecondVector.z)
                                {
                                    if(PointVector.z < FirstVector.z && SecondVector.z < PointVector.z)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }

                                }
                                else if(FirstVector.z < SecondVector.z)
                                {
                                    if(PointVector.z < SecondVector.z && FirstVector.z < PointVector.z)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }
                                }

                            }
                            else
                            {
                                return false;
                            }
                        }
                        else if(FirstVector.y < SecondVector.y)
                        {
                            if(PointVector.y < SecondVector.y && FirstVector.y < PointVector.y)
                            {
                                if(FirstVector.z > SecondVector.z)
                                {
                                    if(PointVector.z < FirstVector.z && SecondVector.z < PointVector.z)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }

                                }
                                else if(FirstVector.z < SecondVector.z)
                                {
                                    if(PointVector.z < SecondVector.z && FirstVector.z < PointVector.z)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }
                                }
                            }
                            else
                            {
                                return false;
                            }
                        }
                    }
                    else
                    {
                        return false;
                    }
                }
                else if(FirstVector.x < SecondVector.x)
                {
                    if(PointVector.x < SecondVector.x && FirstVector.x < PointVector.x)
                    {
                        if(FirstVector.y > SecondVector.y)
                        {
                            if(PointVector.y < FirstVector.y && SecondVector.y < PointVector.y)
                            {
                                if(FirstVector.z > SecondVector.z)
                                {
                                    if(PointVector.z < FirstVector.z && SecondVector.z < PointVector.z)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }

                                }
                                else if(FirstVector.z < SecondVector.z)
                                {
                                    if(PointVector.z < SecondVector.z && FirstVector.z < PointVector.z)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }
                                }
                            }
                            else
                            {
                                return false;
                            }
                        }
                        else if(FirstVector.y < SecondVector.y)
                        {
                            if(PointVector.y < SecondVector.y && FirstVector.y < PointVector.y)
                            {
                                // Y Vector Is Between.

                                if(FirstVector.z > SecondVector.z)
                                {
                                    if(PointVector.z < FirstVector.z && SecondVector.z < PointVector.z)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }

                                }
                                else if(FirstVector.z < SecondVector.z)
                                {
                                    if(PointVector.z < SecondVector.z && FirstVector.z < PointVector.z)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }
                                }
                            }
                            else
                            {
                                return false;
                            }
                        }

                    }
                    else
                    {
                        return false;
                    }
                }
            }
        }
        else
        {
            return false;
        }
    }

}





this.inside = (point, vs) => {

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};









var ZoneManager_Syncer = setInterval(() => {

    try
    {
        mp.players.forEach(player => {

            for(const ZoneObject of mp.zones.registered)
            {
                player.call('ZoneManager_SyncData', [ZoneObject]);
            }
            
        });
    }
    catch(e)
    {
        console.log(`[ZoneManager]: Error syncing zone data: ${e}`)
    }
    
}, 100);