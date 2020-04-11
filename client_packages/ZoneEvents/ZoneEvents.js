

mp.events.add('ZoneManager_SyncData', (ZoneObject) => {

    mp.gui.chat.push(`ZONE ${ZoneObject.zoneName} ${ZoneObject.dimension}.`);
    mp.gui.chat.push(`ZONE STATUS: ${mp.zones.isZoneRegistered(ZoneObject.zoneName, ZoneObject.dimension)}`);

    if(mp.zones.isZoneRegistered(ZoneObject.zoneName, ZoneObject.dimension))
    {
        for(i in mp.zones.registered)
        {
            var RegisteredZone = mp.zones.registered[i];
            if(ZoneObject.type == RegisteredZone.type)
            {
                if(ZoneObject.zoneName == RegisteredZone.zoneName)
                {
                    RegisteredZone.zoneName = ZoneObject.zoneName;
    
                    if(ZoneObject.type == mp.zones.types["2PointZone"])
                    {
                        RegisteredZone.firstvec = ZoneObject.firstvec;
                        RegisteredZone.secondvec = ZoneObject.secondvec;
                        RegisteredZone.data = ZoneObject.data;
                        
                    }
                    else if(ZoneObject.type == mp.zones.types["4PointZone"])
                    {
                        RegisteredZone.firstvec = ZoneObject.firstvec;
                        RegisteredZone.secondvec = ZoneObject.secondvec;
                        RegisteredZone.thirdvec = ZoneObject.thirdvec;
                        RegisteredZone.forthvec = ZoneObject.forthvec;
                        RegisteredZone.height = ZoneObject.height;
                        RegisteredZone.data = ZoneObject.data;
                    }
                    else if(ZoneObject.type == mp.zones.types["6PointZone"])
                    {
                        RegisteredZone.firstvec = ZoneObject.firstvec;
                        RegisteredZone.secondvec = ZoneObject.secondvec;
                        RegisteredZone.thirdvec = ZoneObject.thirdvec;
                        RegisteredZone.forthvec = ZoneObject.forthvec;
                        RegisteredZone.fifthvec = ZoneObject.fifthvec;
                        RegisteredZone.sixthvec = ZoneObject.sixthvec;
                        RegisteredZone.height = ZoneObject.height;
                        RegisteredZone.data = ZoneObject.data;
                    }
                    else if(ZoneObject.type == mp.zones.types["NPointZone"])
                    {
                        RegisteredZone.vectors = ZoneObject.vectors;
                        RegisteredZone.height = ZoneObject.height;
                        RegisteredZone.data = ZoneObject.data;
                    }
                }
            }
        }

    }
    else
    {
        mp.gui.chat.push(`ZONE ${ZoneObject.zoneName} was registered.`);
        mp.zones.registered.push(ZoneObject);
    }

})


mp.events.add('ZoneManager_RegisterZone', (ZoneObject) => {
    mp.zones.registered.push(ZoneObject);
})


mp.events.add('ZoneManager_UnregisterZone', (zoneName, dimension) => {

    if(mp.zones.isZoneRegistered(zoneName, dimension))
    {
        mp.zones.unRegisterZone(zoneName, dimension);
    }

})


