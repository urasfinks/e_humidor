if (bridge.args["switch"] == "constructor") {
    console.log("Hello constructor");
}

if (bridge.args["switch"] == "GetCodeResponse") {
    console.log(bridge.args);
    // if(bridge.args["body"]["status"] == false){
    //     bridge.call("Alert", {
    //         "duration": 7000,
    //         "label": bridge.args["body"]["exception"].join(", ")
    //     });
    // }
    bridge.call("NavigatorPush", {
        "name": "Humidor",
        "modalBottomSheet": true,
        "link": {
            "template": "AccountCode.json",
        }
    });

}

if (bridge.args["switch"] == "GetCode") {
    //console.log(bridge.state);
    bridge.call('Http', {
        "uri": "/getcode",
        "body": {
            "mail": bridge.state["EmailValue"]
        },
        "onResponse": {
            "jsInvoke": "Account.js",
            "args": {
                "switch": "GetCodeResponse"
            }
        }
    });
}