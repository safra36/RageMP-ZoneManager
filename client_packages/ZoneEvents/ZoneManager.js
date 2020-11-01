


mp.storage.flush();
mp.zones = {};
mp.zones.registered = [];
var ZoneManager_Player = mp.players.local;



mp.zones.types = {
    "2PointZone":1,
    "4PointZone":2,
    "6PointZone":3,
    "NPointZone":4
}

mp.zones.isZoneRegistered = (zoneName, dimension) => {

    var ClonedZoneList = JSON.parse(JSON.stringify(mp.zones.registered))
    for(i in ClonedZoneList)
    {
        var ZoneManagerObject = ClonedZoneList[i];
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

//Get a zone by it's array index
mp.zones.getZoneByIndex = (zoneIndex) => {
    return mp.zones.registered[zoneIndex] || undefined;
}

// Unregister a zone by zonename
// Returns True On Success False on ZoneName Not Found
mp.zones.unRegisterZone = (zoneName, dimension) => {

    for(i in mp.zones.registered)
    {
        var ZoneManagerObject = mp.zones.registered[i];
        if(ZoneManagerObject.zoneName == zoneName && ZoneManagerObject.dimension == dimension)
        {
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



// var TestZones = [];

// mp.keys.set(66, 'SavingZone', () => {

//     TestZones.push(new mp.Vector3(ZoneManager_Player.position.x, ZoneManager_Player.position.y, ZoneManager_Player.position.z - 1.5));
//     mp.gui.chat.push(`Saved ${ZoneManager_Player.position}`);

// });

// mp.keys.set(67, 'CreatingZone', () => {


//     mp.zones.drawZoneByN(TestZones, 6.0);
//     mp.gui.chat.push(`Zone has been drawn`);
//     // mp.zones.registerZone(TestZones[0], TestZones[1], -1, -1, -1, 'VerySweetZone!', mp.zones.types["2PointZone"]);
//     if(mp.zones.registerZone(TestZones, 6.0, 'NewSweet6PointZone', mp.zones.types["NPointZone"]))
//     {
//         mp.gui.chat.push(`Zone has been created`);
//     }
//     else
//     {
//         mp.gui.chat.push(`Error Creating the Zone`);
//     }

//     // TestZones.length = 0;


// });


// mp.events.add('ZoneManager_PlayerEnterZone', (player, zoneName) => {

//     mp.gui.chat.push(`ENTERED ZONE : ${zoneName}`);

// })
// mp.events.add('ZoneManager_PlayerExitZone', (player, zoneName) => {

//     mp.gui.chat.push(`EXITED ZONE : ${zoneName}`);
// })




mp.zones.drawZoneBy2 = (startPosition, endPosition, r=255, g=0, b=0, a=255) => {

    var startXVetor = new mp.Vector3(endPosition.x, startPosition.y, startPosition.z);
    var startYVector = new mp.Vector3(startPosition.x, endPosition.y, startPosition.z);
    var startZVector = new mp.Vector3(startPosition.x, startPosition.y, endPosition.z);

    var endXVector = new mp.Vector3(startPosition.x, endPosition.y, endPosition.z);
    var endYVector = new mp.Vector3(endPosition.x, startPosition.y, endPosition.z);
    var endZVector = new mp.Vector3(endPosition.x, endPosition.y, startPosition.z);

    return new mp.Events('render', () => {

        //Bottom Or Top
        mp.game.graphics.drawLine(endZVector.x, endZVector.y, endZVector.z, startXVetor.x, startXVetor.y, startXVetor.z, r, g, b, a);
        mp.game.graphics.drawLine(endZVector.x, endZVector.y, endZVector.z, startYVector.x, startYVector.y, startYVector.z, r, g, b, a);
        mp.game.graphics.drawLine(startPosition.x, startPosition.y, startYVector.z, startYVector.x, startYVector.y, startYVector.z, r, g, b, a);
        mp.game.graphics.drawLine(startPosition.x, startPosition.y, startXVetor.z, startXVetor.x, startXVetor.y, startXVetor.z, r, g, b, a);

        // Bottom Or Top
        mp.game.graphics.drawLine(startZVector.x, startZVector.y, startZVector.z, endXVector.x, endXVector.y, endXVector.z, r, g, b, a);
        mp.game.graphics.drawLine(startZVector.x, startZVector.y, startZVector.z, endYVector.x, endYVector.y, endYVector.z, r, g, b, a);
        mp.game.graphics.drawLine(endPosition.x, endPosition.y, endPosition.z, endXVector.x, endXVector.y, endXVector.z, r, g, b, a);
        mp.game.graphics.drawLine(endPosition.x, endPosition.y, endPosition.z, endYVector.x, endYVector.y, endYVector.z, r, g, b, a);

        //Connections
        mp.game.graphics.drawLine(startPosition.x, startPosition.y, startPosition.z, startZVector.x, startZVector.y, startZVector.z, r, g, b, a);
        mp.game.graphics.drawLine(endPosition.x, endPosition.y, endPosition.z, endZVector.x, endZVector.y, endZVector.z, r, g, b, a);
        mp.game.graphics.drawLine(endXVector.x, endXVector.y, endXVector.z, startYVector.x, startYVector.y, startYVector.z, r, g, b, a);
        mp.game.graphics.drawLine(startXVetor.x, startXVetor.y, startXVetor.z, endYVector.x, endYVector.y, endYVector.z, r, g, b, a);


    })
    

}


mp.zones.drawZoneBy4 = (Vectors, height, r=255, g=0, b=0, a=255) => {

    return new mp.Events('render', () => {

        // Bottom
        mp.game.graphics.drawLine(Vectors[0].x, Vectors[0].y, Vectors[0].z, Vectors[1].x, Vectors[1].y, Vectors[1].z, r, g, b, a);
        mp.game.graphics.drawLine(Vectors[1].x, Vectors[1].y, Vectors[1].z, Vectors[2].x, Vectors[2].y, Vectors[2].z, r, g, b, a);
        mp.game.graphics.drawLine(Vectors[2].x, Vectors[2].y, Vectors[2].z, Vectors[3].x, Vectors[3].y, Vectors[3].z, r, g, b, a);
        mp.game.graphics.drawLine(Vectors[3].x, Vectors[3].y, Vectors[3].z, Vectors[1].x, Vectors[1].y, Vectors[1].z, r, g, b, a);

        //Top
        mp.game.graphics.drawLine(Vectors[0].x, Vectors[0].y, Vectors[0].z + parseFloat(height), Vectors[1].x, Vectors[1].y, Vectors[1].z + parseFloat(height), r, g, b, a);
        mp.game.graphics.drawLine(Vectors[1].x, Vectors[1].y, Vectors[1].z + parseFloat(height), Vectors[2].x, Vectors[2].y, Vectors[2].z + parseFloat(height), r, g, b, a);
        mp.game.graphics.drawLine(Vectors[2].x, Vectors[2].y, Vectors[2].z + parseFloat(height), Vectors[3].x, Vectors[3].y, Vectors[3].z + parseFloat(height), r, g, b, a);
        mp.game.graphics.drawLine(Vectors[3].x, Vectors[3].y, Vectors[3].z + parseFloat(height), Vectors[0].x, Vectors[0].y, Vectors[0].z + parseFloat(height), r, g, b, a);

        //Cennections
        mp.game.graphics.drawLine(Vectors[0].x, Vectors[0].y, Vectors[0].z, Vectors[0].x, Vectors[0].y, Vectors[0].z + parseFloat(height), r, g, b, a);
        mp.game.graphics.drawLine(Vectors[1].x, Vectors[1].y, Vectors[1].z, Vectors[1].x, Vectors[1].y, Vectors[1].z + parseFloat(height), r, g, b, a);
        mp.game.graphics.drawLine(Vectors[2].x, Vectors[2].y, Vectors[2].z, Vectors[2].x, Vectors[2].y, Vectors[2].z + parseFloat(height), r, g, b, a);
        mp.game.graphics.drawLine(Vectors[3].x, Vectors[3].y, Vectors[3].z, Vectors[3].x, Vectors[3].y, Vectors[3].z + parseFloat(height), r, g, b, a);

    })
}

mp.zones.drawZoneBy6 = (Vectors, height, r=255, g=0, b=0, a=255) => {

    return new mp.Events('render', () => {

        // Bottom
        mp.game.graphics.drawLine(Vectors[0].x, Vectors[0].y, Vectors[0].z, Vectors[1].x, Vectors[1].y, Vectors[1].z, r, g, b, a);
        mp.game.graphics.drawLine(Vectors[1].x, Vectors[1].y, Vectors[1].z, Vectors[2].x, Vectors[2].y, Vectors[2].z, r, g, b, a);
        mp.game.graphics.drawLine(Vectors[2].x, Vectors[2].y, Vectors[2].z, Vectors[3].x, Vectors[3].y, Vectors[3].z, r, g, b, a);
        mp.game.graphics.drawLine(Vectors[3].x, Vectors[3].y, Vectors[3].z, Vectors[4].x, Vectors[4].y, Vectors[4].z, r, g, b, a);
        mp.game.graphics.drawLine(Vectors[4].x, Vectors[4].y, Vectors[4].z, Vectors[5].x, Vectors[5].y, Vectors[5].z, r, g, b, a);
        mp.game.graphics.drawLine(Vectors[5].x, Vectors[5].y, Vectors[5].z, Vectors[0].x, Vectors[0].y, Vectors[0].z, r, g, b, a);

        mp.game.graphics.drawLine(Vectors[0].x, Vectors[0].y, Vectors[0].z + parseFloat(height), Vectors[1].x, Vectors[1].y, Vectors[1].z + parseFloat(height), r, g, b, a);
        mp.game.graphics.drawLine(Vectors[1].x, Vectors[1].y, Vectors[1].z + parseFloat(height), Vectors[2].x, Vectors[2].y, Vectors[2].z + parseFloat(height), r, g, b, a);
        mp.game.graphics.drawLine(Vectors[2].x, Vectors[2].y, Vectors[2].z + parseFloat(height), Vectors[3].x, Vectors[3].y, Vectors[3].z + parseFloat(height), r, g, b, a);
        mp.game.graphics.drawLine(Vectors[3].x, Vectors[3].y, Vectors[3].z + parseFloat(height), Vectors[4].x, Vectors[4].y, Vectors[4].z + parseFloat(height), r, g, b, a);
        mp.game.graphics.drawLine(Vectors[4].x, Vectors[4].y, Vectors[4].z + parseFloat(height), Vectors[5].x, Vectors[5].y, Vectors[5].z + parseFloat(height), r, g, b, a);
        mp.game.graphics.drawLine(Vectors[5].x, Vectors[5].y, Vectors[5].z + parseFloat(height), Vectors[0].x, Vectors[0].y, Vectors[0].z + parseFloat(height), r, g, b, a);

        //Cennections
        mp.game.graphics.drawLine(Vectors[0].x, Vectors[0].y, Vectors[0].z, Vectors[0].x, Vectors[0].y, Vectors[0].z + parseFloat(height), r, g, b, a);
        mp.game.graphics.drawLine(Vectors[1].x, Vectors[1].y, Vectors[1].z, Vectors[1].x, Vectors[1].y, Vectors[1].z + parseFloat(height), r, g, b, a);
        mp.game.graphics.drawLine(Vectors[2].x, Vectors[2].y, Vectors[2].z, Vectors[2].x, Vectors[2].y, Vectors[2].z + parseFloat(height), r, g, b, a);
        mp.game.graphics.drawLine(Vectors[3].x, Vectors[3].y, Vectors[3].z, Vectors[3].x, Vectors[3].y, Vectors[3].z + parseFloat(height), r, g, b, a);
        mp.game.graphics.drawLine(Vectors[4].x, Vectors[4].y, Vectors[4].z, Vectors[4].x, Vectors[4].y, Vectors[4].z + parseFloat(height), r, g, b, a);
        mp.game.graphics.drawLine(Vectors[5].x, Vectors[5].y, Vectors[5].z, Vectors[5].x, Vectors[5].y, Vectors[5].z + parseFloat(height), r, g, b, a);

    })
}






mp.zones.drawZoneByN = (Vectors, height, r=255, g=0, b=0, a=255) => {

    //Check if vectors length are more than 2

    return new mp.Events('render', () => {

        var TotalLengthOfVectors = parseInt(Vectors.length, 10);
        for(i in Vectors)
        {
            if(i != (TotalLengthOfVectors - 1))
            {
                i = parseInt(i, 10);
                //We still have vectors till the last vector
                var CurrentVector = Vectors[i];
                var NextVector = Vectors[i+1];

                var CurrentVectorUp = new mp.Vector3(CurrentVector.x, CurrentVector.y, CurrentVector.z + parseFloat(height));
                var NextVectorUp = new mp.Vector3(NextVector.x, NextVector.y, NextVector.z + parseFloat(height));

                mp.game.graphics.drawLine(CurrentVector.x, CurrentVector.y, CurrentVector.z, NextVector.x, NextVector.y, NextVector.z, r, g, b, a);
                mp.game.graphics.drawLine(CurrentVector.x, CurrentVector.y, CurrentVector.z, CurrentVectorUp.x, CurrentVectorUp.y, CurrentVectorUp.z, r, g, b, a);
                mp.game.graphics.drawLine(NextVector.x, NextVector.y, NextVector.z, NextVectorUp.x, NextVectorUp.y, NextVectorUp.z, r, g, b, a);
                mp.game.graphics.drawLine(CurrentVectorUp.x, CurrentVectorUp.y, CurrentVectorUp.z, NextVectorUp.x, NextVectorUp.y, NextVectorUp.z, r, g, b, a);

            }
            else
            {
                //This is the end ...
                var CurrentVector = Vectors[i];
                var NextVector = Vectors[0];

                var CurrentVectorUp = new mp.Vector3(CurrentVector.x, CurrentVector.y, CurrentVector.z + parseFloat(height));
                var NextVectorUp = new mp.Vector3(NextVector.x, NextVector.y, NextVector.z + parseFloat(height));

                mp.game.graphics.drawLine(CurrentVector.x, CurrentVector.y, CurrentVector.z, NextVector.x, NextVector.y, NextVector.z, r, g, b, a);
                mp.game.graphics.drawLine(CurrentVector.x, CurrentVector.y, CurrentVector.z, CurrentVectorUp.x, CurrentVectorUp.y, CurrentVectorUp.z, r, g, b, a);
                mp.game.graphics.drawLine(NextVector.x, NextVector.y, NextVector.z, NextVectorUp.x, NextVectorUp.y, NextVectorUp.z, r, g, b, a);
                mp.game.graphics.drawLine(CurrentVectorUp.x, CurrentVectorUp.y, CurrentVectorUp.z, NextVectorUp.x, NextVectorUp.y, NextVectorUp.z, r, g, b, a);
            }
        }

    })
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











mp.events.add('render', () => {

    // mp.zones.registered.forEach((ZoneObject) => {
    mp.zones.registered.map((ZoneObject, index, ZoneArray) => {

        if(ZoneManager_Player.dimension != ZoneObject.dimension)
        {
            if(ZoneObject.collieded)
            {
                mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                ZoneObject.collieded = false;
                ZoneArray[index] = ZoneObject;
            }
        }
        else if(ZoneObject.type ==  mp.zones.types["2PointZone"])
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
                                    //Z Vector Is Between
                                    //All X Y Z Is Between!
                                    if(!ZoneObject.collieded && ZoneManager_Player.dimension == ZoneObject.dimension)
                                    {
                                        mp.events.call('ZoneManager_PlayerEnterZone', ZoneManager_Player, ZoneObject.zoneName);
                                        mp.events.callRemote('ZoneManager_PlayerEnterZone', ZoneObject.zoneName);
                                        ZoneObject.collieded = true;
                                        ZoneArray[index] = ZoneObject;
                                    }
                                }
                                else
                                {
                                    //Z Is Out All Others In
                                    if(ZoneObject.collieded)
                                    {
                                        mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                                        mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                                        ZoneObject.collieded = false;
                                        ZoneArray[index] = ZoneObject;
                                    }
                                }

                            }
                            else if(FirstVector.z < SecondVector.z)
                            {
                                if(PointVector.z < SecondVector.z && FirstVector.z < PointVector.z)
                                {
                                    //Z Vector Is Between
                                    //All X Y Z Is Between!

                                    if(!ZoneObject.collieded && ZoneManager_Player.dimension == ZoneObject.dimension)
                                    {
                                        mp.events.call('ZoneManager_PlayerEnterZone', ZoneManager_Player, ZoneObject.zoneName);
                                        mp.events.callRemote('ZoneManager_PlayerEnterZone', ZoneObject.zoneName);
                                        ZoneObject.collieded = true;
                                        ZoneArray[index] = ZoneObject;
                                    }
                                }
                                else
                                {
                                    //Z Is Out All Others In

                                    if(ZoneObject.collieded)
                                    {
                                        mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                                        mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                                        ZoneObject.collieded = false;
                                        ZoneArray[index] = ZoneObject;
                                    }
                                }
                            }

                        }
                        else
                        {
                            //Y Is Out
                            if(ZoneObject.collieded)
                            {
                                mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                                mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                                ZoneObject.collieded = false;
                                ZoneArray[index] = ZoneObject;
                            }

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
                                    //Z Vector Is Between
                                    //All X Y Z Is Between!

                                    if(!ZoneObject.collieded && ZoneManager_Player.dimension == ZoneObject.dimension)
                                    {
                                        mp.events.call('ZoneManager_PlayerEnterZone', ZoneManager_Player, ZoneObject.zoneName);
                                        mp.events.callRemote('ZoneManager_PlayerEnterZone', ZoneObject.zoneName);
                                        ZoneObject.collieded = true;
                                        ZoneArray[index] = ZoneObject;
                                    }
                                }
                                else
                                {
                                    //Z Is Out All Others In

                                    if(ZoneObject.collieded)
                                    {
                                        mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                                        mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                                        ZoneObject.collieded = false;
                                        ZoneArray[index] = ZoneObject;
                                    }
                                }

                            }
                            else if(FirstVector.z < SecondVector.z)
                            {
                                if(PointVector.z < SecondVector.z && FirstVector.z < PointVector.z)
                                {
                                    //Z Vector Is Between
                                    //All X Y Z Is Between!

                                    if(!ZoneObject.collieded && ZoneManager_Player.dimension == ZoneObject.dimension)
                                    {
                                        mp.events.call('ZoneManager_PlayerEnterZone', ZoneManager_Player, ZoneObject.zoneName);
                                        mp.events.callRemote('ZoneManager_PlayerEnterZone', ZoneObject.zoneName);
                                        ZoneObject.collieded = true;
                                        ZoneArray[index] = ZoneObject;
                                    }
                                }
                                else
                                {
                                    //Z Is Out All Others In

                                    if(ZoneObject.collieded)
                                    {
                                        mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                                        mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                                        ZoneObject.collieded = false;
                                        ZoneArray[index] = ZoneObject;
                                    }
                                }
                            }
                        }
                        else
                        {
                            //Y Is Out

                            if(ZoneObject.collieded)
                            {
                                mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                                mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                                ZoneObject.collieded = false;
                                ZoneArray[index] = ZoneObject;
                            }
                        }
                    }
                }
                else
                {
                    //X Is Out

                    if(ZoneObject.collieded)
                    {
                        mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                        mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                        ZoneObject.collieded = false;
                        ZoneArray[index] = ZoneObject;
                    }
                }
            }
            else if(FirstVector.x < SecondVector.x)
            {
                if(PointVector.x < SecondVector.x && FirstVector.x < PointVector.x)
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
                                    //Z Vector Is Between
                                    //All X Y Z Is Between!
                                    if(!ZoneObject.collieded && ZoneManager_Player.dimension == ZoneObject.dimension)
                                    {
                                        mp.events.call('ZoneManager_PlayerEnterZone', ZoneManager_Player, ZoneObject.zoneName);
                                        mp.events.callRemote('ZoneManager_PlayerEnterZone', ZoneObject.zoneName);
                                        ZoneObject.collieded = true;
                                        ZoneArray[index] = ZoneObject;
                                    }
                                }
                                else
                                {
                                    //Z Is Out All Others In
                                    if(ZoneObject.collieded)
                                    {
                                        mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                                        mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                                        ZoneObject.collieded = false;
                                        ZoneArray[index] = ZoneObject;
                                    }
                                }

                            }
                            else if(FirstVector.z < SecondVector.z)
                            {
                                if(PointVector.z < SecondVector.z && FirstVector.z < PointVector.z)
                                {
                                    //Z Vector Is Between
                                    //All X Y Z Is Between!
                                    if(!ZoneObject.collieded && ZoneManager_Player.dimension == ZoneObject.dimension)
                                    {
                                        mp.events.call('ZoneManager_PlayerEnterZone', ZoneManager_Player, ZoneObject.zoneName);
                                        mp.events.callRemote('ZoneManager_PlayerEnterZone', ZoneObject.zoneName);
                                        ZoneObject.collieded = true;
                                        ZoneArray[index] = ZoneObject;
                                    }
                                }
                                else
                                {
                                    //Z Is Out All Others In
                                    if(ZoneObject.collieded)
                                    {
                                        mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                                        mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                                        ZoneObject.collieded = false;
                                        ZoneArray[index] = ZoneObject;
                                    }
                                }
                            }
                        }
                        else
                        {
                            //Y Is Out
                            if(ZoneObject.collieded)
                            {
                                mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                                mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                                ZoneObject.collieded = false;
                                ZoneArray[index] = ZoneObject;
                            }
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
                                    //Z Vector Is Between
                                    //All X Y Z Is Between!
                                    if(!ZoneObject.collieded && ZoneManager_Player.dimension == ZoneObject.dimension)
                                    {
                                        mp.events.call('ZoneManager_PlayerEnterZone', ZoneManager_Player, ZoneObject.zoneName);
                                        mp.events.callRemote('ZoneManager_PlayerEnterZone', ZoneObject.zoneName);
                                        ZoneObject.collieded = true;
                                        ZoneArray[index] = ZoneObject;
                                    }
                                }
                                else
                                {
                                    //Z Is Out All Others In
                                    if(ZoneObject.collieded)
                                    {
                                        mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                                        mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                                        ZoneObject.collieded = false;
                                        ZoneArray[index] = ZoneObject;
                                    }
                                }

                            }
                            else if(FirstVector.z < SecondVector.z)
                            {
                                if(PointVector.z < SecondVector.z && FirstVector.z < PointVector.z)
                                {
                                    //Z Vector Is Between
                                    //All X Y Z Is Between!
                                    if(!ZoneObject.collieded && ZoneManager_Player.dimension == ZoneObject.dimension)
                                    {
                                        mp.events.call('ZoneManager_PlayerEnterZone', ZoneManager_Player, ZoneObject.zoneName);
                                        mp.events.callRemote('ZoneManager_PlayerEnterZone', ZoneObject.zoneName);
                                        ZoneObject.collieded = true;
                                        ZoneArray[index] = ZoneObject;
                                    }
                                }
                                else
                                {
                                    //Z Is Out All Others In
                                    if(ZoneObject.collieded)
                                    {
                                        mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                                        mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                                        ZoneObject.collieded = false;
                                        ZoneArray[index] = ZoneObject;
                                    }
                                }
                            }
                        }
                        else
                        {
                            //Y Is Out!
                            if(ZoneObject.collieded)
                            {
                                mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                                mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                                ZoneObject.collieded = false;
                                ZoneArray[index] = ZoneObject;
                            }
                        }
                    }

                }
                else
                {
                    //X Is Out!
                    if(ZoneObject.collieded)
                    {
                        mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                        mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                        ZoneObject.collieded = false;
                        ZoneArray[index] = ZoneObject;
                    }
                }
            }
        }
        else if(ZoneObject.type == mp.zones.types["4PointZone"])
        {
            // mp.gui.chat.push(`DO I EVEN GET CALLED?`);
            var FirstVector = ZoneObject.firstvec;
            var SecondVector = ZoneObject.secondvec;
            var ThirdVector = ZoneObject.thirdvec;
            var ForthVector = ZoneObject.forthvec;
            var ZoneHeight = ZoneObject.height;
            var PointVector = ZoneManager_Player.position;


            //We need to handle the eazy part which is Z and then we handle the last 2 and we are done!

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

                // mp.gui.chat.push(`Z Is Okay`);

                //Z Is Okay Now!
                // Forget About Z, let's make a compare at X and Y Only

                var pointInside = [PointVector.x, PointVector.y];
                var ShapeCoords = [[FirstVector.x, FirstVector.y], [SecondVector.x, SecondVector.y], [ThirdVector.x, ThirdVector.y], [ForthVector.x, ForthVector.y]];

                if(this.inside(pointInside, ShapeCoords))
                {
                    if(!ZoneObject.collieded && ZoneManager_Player.dimension == ZoneObject.dimension)
                    {
                        mp.events.call('ZoneManager_PlayerEnterZone', ZoneManager_Player, ZoneObject.zoneName);
                        mp.events.callRemote('ZoneManager_PlayerEnterZone', ZoneObject.zoneName);
                        ZoneObject.collieded = true;
                        ZoneArray[index] = ZoneObject;
                    }
                }
                else
                {
                    if(ZoneObject.collieded)
                    {
                        mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                        mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                        ZoneObject.collieded = false;
                        ZoneArray[index] = ZoneObject;
                    }
                }


            }
            else
            {
                //Z is Out!
                // mp.gui.chat.push(`Z Is Out`);
                if(ZoneObject.collieded)
                {
                    mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                    mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                    ZoneObject.collieded = false;
                    ZoneArray[index] = ZoneObject;
                }
            }


        }
        else if(ZoneObject.type == mp.zones.types["6PointZone"])
        {
            // mp.gui.chat.push(`DO I EVEN GET CALLED?`);
            var FirstVector = ZoneObject.firstvec;
            var SecondVector = ZoneObject.secondvec;
            var ThirdVector = ZoneObject.thirdvec;
            var ForthVector = ZoneObject.forthvec;
            var FifthVector = ZoneObject.fifthvec;
            var SixthVector = ZoneObject.sixthvec;

            var ZoneHeight = ZoneObject.height;
            var PointVector = ZoneManager_Player.position;


            //We need to handle the eazy part which is Z and then we handle the last 2 and we are done!
            // You suck man! you need to handle every fuckin 3 parts in order to get the best results!
            //You suck more! you have to check every shape created !
            // Okay since we find a way to implement the 3d space we use 2d only



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

                // mp.gui.chat.push(`Z Is Okay`);

                //Z Is Okay Now!
                // Forget About Z, let's make a compare at X and Y Only

                var pointInside = [PointVector.x, PointVector.y];
                var ShapeCoords = [[FirstVector.x, FirstVector.y], [SecondVector.x, SecondVector.y], [ThirdVector.x, ThirdVector.y], [ForthVector.x, ForthVector.y], [FifthVector.x, FifthVector.y], [SixthVector.x, SixthVector.y]];

                if(this.inside(pointInside, ShapeCoords))
                {
                    if(!ZoneObject.collieded && ZoneManager_Player.dimension == ZoneObject.dimension)
                    {
                        mp.events.call('ZoneManager_PlayerEnterZone', ZoneManager_Player, ZoneObject.zoneName);
                        mp.events.callRemote('ZoneManager_PlayerEnterZone', ZoneObject.zoneName);
                        ZoneObject.collieded = true;
                        ZoneArray[index] = ZoneObject;
                    }
                }
                else
                {
                    if(ZoneObject.collieded)
                    {
                        mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                        mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                        ZoneObject.collieded = false;
                        ZoneArray[index] = ZoneObject;
                    }
                }


            }
            else
            {
                //Z is Out!
                // mp.gui.chat.push(`Z Is Out`);
                if(ZoneObject.collieded)
                {
                    mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                    mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                    ZoneObject.collieded = false;
                    ZoneArray[index] = ZoneObject;
                }
            }


        }
        else if(ZoneObject.type == mp.zones.types["NPointZone"])
        {

            var PointVector = ZoneManager_Player.position;
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
                    if(ZoneObject.collieded)
                    {
                        mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                        mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                        ZoneObject.collieded = false;
                        ZoneArray[index] = ZoneObject;
                    }
                    return;
                }

            }

            //Okay Z Axis is okay, go for the other shets ...
            if(this.inside(pointInside, ShapeCoords))
            {
                if(!ZoneObject.collieded && ZoneManager_Player.dimension == ZoneObject.dimension)
                {
                    mp.events.call('ZoneManager_PlayerEnterZone', ZoneManager_Player, ZoneObject.zoneName);
                    mp.events.callRemote('ZoneManager_PlayerEnterZone', ZoneObject.zoneName);
                    ZoneObject.collieded = true;
                    ZoneArray[index] = ZoneObject;
                }
            }
            else
            {
                if(ZoneObject.collieded)
                {
                    mp.events.call('ZoneManager_PlayerExitZone', ZoneManager_Player, ZoneObject.zoneName);
                    mp.events.callRemote('ZoneManager_PlayerExitZone', ZoneObject.zoneName);
                    ZoneObject.collieded = false;
                    ZoneArray[index] = ZoneObject;
                }
            }
        }
    })
})



this.GetLowestNumberOfArray = (numberArray) => {

    var LastLowestNumber = numberArray[0];

    for(i in numberArray)
    {
        var LowNumber = numberArray[i];
        if(LowNumber < LastLowestNumber)
        {
            LastLowestNumber = LowNumber;
        }
    }

    return LastLowestNumber;

}


this.GetHighestNumberOfArray = (numberArray) => {

    var LastHighestNumber = numberArray[0];

    for(i in numberArray)
    {
        var HighNumber = numberArray[i];
        if(HighNumber > LastHighestNumber)
        {
            LastHighestNumber = HighNumber;
        }
    }

    return LastHighestNumber;

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

//Not Complete
this.getAreaOf2DPolygon = (points) => {


    var sumX = parseInt(0, 10);
    var sumY = parseInt(0, 10);
    
    for(i in points)
    {
    
        if(i < points.length - 1)
        {
            const currentPointX = points[parseInt(i, 10)][0];
            const nextPointY = points[parseInt(i, 10)+1][1];        
    
            const currentPointY = points[i][1];
            const nextPointX = points[parseInt(i, 10)+1][0]; 
    
            sumX += currentPointX * nextPointY;
            sumY += currentPointY * nextPointX;
    
        }
        else
        {
            const currentPointX = points[parseInt(i, 10)][0];
            const nextPointY = points[0][1];
    
            const currentPointY = points[i][1];
            const nextPointX = points[0][0];
    
            sumX += currentPointX * nextPointY;
            sumY += currentPointY * nextPointX;

    
        }
    
    }
    
    return (sumX - sumY)/2;
}

this.getCenter = (points, area) => {

    var centerX = 1/(6*area);
    var centerY = 1/(6*area);

    var centerXSum = 0.0;
    var centerYSum = 0.0;

    for(i in points)
    {
        if(i < points.length - 1)
        {
            centerXSum += ((points[parseInt(i, 10)][0] + points[parseInt(i, 10)+1][0]) * (points[parseInt(i, 10)][0] * points[parseInt(i, 10)+1][1] - points[parseInt(i, 10)+1][0] * points[parseInt(i, 10)][1]));
            centerYSum += ((points[parseInt(i, 10)][1] + points[parseInt(i, 10)+1][1]) * (points[parseInt(i, 10)][0] * points[parseInt(i, 10)+1][1] - points[parseInt(i, 10)+1][0] * points[parseInt(i, 10)][1]));
        }
        else
        {
            centerXSum += ((points[parseInt(i, 10)][0] + points[0][0]) * (points[parseInt(i, 10)][0] * points[0][1] - points[0][0] * points[parseInt(i, 10)][1]));
            centerYSum += ((points[parseInt(i, 10)][1] + points[0][1]) * (points[parseInt(i, 10)][0] * points[0][1] - points[0][0] * points[parseInt(i, 10)][1]));
        }
    }

    console.log(centerX * centerXSum)
    console.log(centerY * centerYSum)

    console.log(centerYSum)
    console.log(centerYSum)


    var returnObject = {}
    returnObject.x = centerX * centerXSum;
    returnObject.y = centerY * centerYSum;
    returnObject.z = 0.0;

    return returnObject;

}

//Rotate using certain point
// rotatePointObject = {x:1.0, y:1.0. z:0.0}
this.rotateByAngle = (points, rotatePointObject, angle) => {

    var rotateMatrix = [[Math.cos(angle), -Math.sin(angle)], [Math.sin(angle), Math.cos(angle)]]
    var finalPoints = [];
    

    for(i in points)
    {

        var fPoints = this.multiplyMatrices(rotateMatrix, [[points[i][0] - rotatePointObject.x], [points[i][1] - rotatePointObject.y]])
        var arrayToAdd = [parseFloat(fPoints[0][0]) + rotatePointObject.x, parseFloat(fPoints[1][0]) + rotatePointObject.y]

        finalPoints.push(arrayToAdd);

    }

    return finalPoints;

}

//Rotate by center of the shape
this.centerRotateByAngle = (points, angle) => {

    var rotateMatrix = [[Math.cos(angle), -Math.sin(angle)], [Math.sin(angle), Math.cos(angle)]]
    var shapeCenteroid = this.getCenter(points, this.getAreaOf2DPolygon(points));

    var finalPoints = [];

    

    for(i in points)
    {

        var fPoints = this.multiplyMatrices(rotateMatrix, [[points[i][0] - shapeCenteroid.x], [points[i][1] - shapeCenteroid.y]])
        var arrayToAdd = [parseFloat(fPoints[0][0]) + shapeCenteroid.x, parseFloat(fPoints[1][0]) + shapeCenteroid.y]

        finalPoints.push(arrayToAdd);

    }

    return finalPoints;

}

this.multiplyMatrices = (a, b) => {

    if(Array.isArray(a) && Array.isArray(b))
    {
        var x = a.length;
        var z = a[0].length;
        var  y = b[0].length;

        // number of columns in the first matrix should be the same as the number of rows in the second
        if (b.length !== z) 
        {
            throw new Error('number of columns in the first matrix should be the same as the number of rows in the second');
        }
        else
        {
            var productRow = Array.apply(null, new Array(y)).map(Number.prototype.valueOf, 0);
            var product = new Array(x);
            for (var p = 0; p < x; p++) {
                product[p] = productRow.slice();
            }

            for (var i = 0; i < x; i++) {
                for (var j = 0; j < y; j++) {
                    for (var k = 0; k < z; k++) {
                        product[i][j] += a[i][k] * b[k][j];
                    }
                }
            }

            return product;
        }
    }
    else
    {
        throw new Error('Arguments must 2 dimensional arrays.');
    }
    
}

this.dtr = (degree) => {
  return degree * (Math.PI/180);
}
