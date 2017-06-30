API.onServerEventTrigger.connect(function(eventName, args) {
    if(eventName !== "vd_generate") return;

    var values = JSON.parse(args[0]);

    var result = {};
    for(var id of values) {
        result[id] = {
            DisplayName:            API.getVehicleDisplayName(id) , // API.returnNative("GET_DISPLAY_NAME_FROM_VEHICLE_MODEL", 4, id)
            MaxSpeed:               API.returnNative("_GET_VEHICLE_MODEL_MAX_SPEED", 7, id),
            MaxBraking:             API.returnNative("GET_VEHICLE_MODEL_MAX_BRAKING", 7, id),
            MaxTraction:            API.returnNative("GET_VEHICLE_MODEL_MAX_TRACTION", 7, id),
            MaxAcceleration:        API.returnNative("GET_VEHICLE_MODEL_ACCELERATION", 7, id),
            _0xBFBA3BA79CFF7EBF:    API.returnNative("0xBFBA3BA79CFF7EBF", 7, id),
            _0x53409B5163D5B846:    API.returnNative("0x53409B5163D5B846", 7, id),
            _0xC6AD107DDC9054CC:    API.returnNative("0xC6AD107DDC9054CC", 7, id),
            _0x5AA3F878A178C4FC:    API.returnNative("0x5AA3F878A178C4FC", 7, id),
            MaxNumberOfPassengers:  (API.returnNative("0x2AD93716F184EDA4", 0, id) - 1),
            MaxOccupants:           API.returnNative("0x2AD93716F184EDA4", 0, id),
            VehicleClass:           API.returnNative("GET_VEHICLE_CLASS_FROM_NAME", 0, id)
        };
    }

    API.triggerServerEvent("vd_receiveresult", API.toJson(result));
});
