if (bridge.args["switch"] == "constructor") {
    bridge.call('DbQuery', {
        "stateKey": "HumidorList",
        "sql": "select * from data where key_data = ? order by id_data",
        "args": ["humidor"],
        "onFetch": {
            "jsInvoke": "HomePage.js",
            "args": {
                "includeStateData": true,
                "switch": "checkCountData"
            }
        }
    });
}

if (bridge.args["switch"] == "checkCountData") {
    //console.log(bridge.state["HumidorList"]);
    bridge.call('SetStateData', {
        "key": "count",
        "value": bridge.state["HumidorList"].length + ""
    });
}

if (bridge.args["switch"] == "onRemove") {
    bridge.call('DbQuery', {
        "sql": "delete from data where key_data = ? and uuid_data = ?",
        "args": ["humidor", bridge.args["uuid_data"]],
        "onFetch": {
            "jsInvoke": "HomePage.js",
            "args": {
                "switch": "constructor"
            }
        }
    });
}

if (bridge.args["switch"] == "addHumidor") {
    var uuid = bridge.call('Uuid', {})["uuid"];
    bridge.call('DataSourceSet', {
        "uuid": uuid,
        "value": {
            "label": "Хьюмидор"
        },
        "type": "userDataRSync",
        "key": "humidor",
        "onPersist": {
            "jsInvoke": "HomePage.js",
            "args": {
                "switch": "constructor"
            }
        }
    });
}

