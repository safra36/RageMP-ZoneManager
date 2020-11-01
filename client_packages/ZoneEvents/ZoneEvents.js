

mp.events.add('ZoneManager_SyncData', (ZoneObject) => {


    if(!mp.zones.isZoneRegistered(ZoneObject.zoneName, ZoneObject.dimension))
    {
        // mp.gui.chat.push(`ZONE ${ZoneObject.zoneName} was registered.`);

        mp.zones.registered.push(ZoneObject);
        mp.events.call('ZoneManager_OnZoneCreated', mp.zones.registered.indexOf(ZoneObject));
    }
    else
    {
        mp.zones.registered.forEach((RegisteredZone) => {

            if(ZoneObject.type == RegisteredZone.type)
            {
                if(ZoneObject.zoneName == RegisteredZone.zoneName)
                {
                    // RegisteredZone.zoneName = ZoneObject.zoneName;
    
                    if(ZoneObject.type == mp.zones.types["2PointZone"])
                    {
                        RegisteredZone.firstvec = ZoneObject.firstvec;
                        RegisteredZone.secondvec = ZoneObject.secondvec;
                        RegisteredZone.data = ZoneObject.data;
                        mp.events.call('ZoneManager_OnZoneUpdated', mp.zones.registered.indexOf(RegisteredZone));
                        
                    }
                    else if(ZoneObject.type == mp.zones.types["4PointZone"])
                    {
                        RegisteredZone.firstvec = ZoneObject.firstvec;
                        RegisteredZone.secondvec = ZoneObject.secondvec;
                        RegisteredZone.thirdvec = ZoneObject.thirdvec;
                        RegisteredZone.forthvec = ZoneObject.forthvec;
                        RegisteredZone.height = ZoneObject.height;
                        RegisteredZone.data = ZoneObject.data;
                        mp.events.call('ZoneManager_OnZoneUpdated', mp.zones.registered.indexOf(RegisteredZone));
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
                        mp.events.call('ZoneManager_OnZoneUpdated', mp.zones.registered.indexOf(RegisteredZone));
                    }
                    else if(ZoneObject.type == mp.zones.types["NPointZone"])
                    {
                        RegisteredZone.vectors = ZoneObject.vectors;
                        RegisteredZone.height = ZoneObject.height;
                        RegisteredZone.data = ZoneObject.data;
                        mp.events.call('ZoneManager_OnZoneUpdated', mp.zones.registered.indexOf(RegisteredZone));
                    }
                }
            }

        })

    }

})

mp.events.add('ZoneManager_PlayerEnterZone', (player, zoneName) => {

    mp.gui.chat.push(`ENTERED ZONE : ${zoneName}`);

})
mp.events.add('ZoneManager_PlayerExitZone', (player, zoneName) => {

    mp.gui.chat.push(`EXITED ZONE : ${zoneName}`);
})


/* mp.events.add('ZoneManager_OnZoneCreated', (ZoneIndex) => {


})

mp.events.add('ZoneManager_OnZoneUpdated', (ZoneIndex) => {


}) */