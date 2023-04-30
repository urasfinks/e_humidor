if (bridge.args["switch"] == "constructor") {
    console.log("Hello constructor");
}

if (bridge.args["switch"] == "GetCode") {
    bridge.call("HideKeyboard", {});
    bridge.call("CustomLoaderOpen", {});
    bridge.call('Http', {
        "uri": "/getcode",
        "body": {
            "mail": bridge.state["EmailValue"]
        },
        "onResponse": {
            "jsInvoke": "Account.js",
            "args": {
                "includeStateData": true,
                "switch": "GetCodeResponse"
            }
        }
    });
}

if (bridge.args["switch"] == "GetCodeResponse") {
    bridge.call("CustomLoaderClose", {});
    console.log(bridge.args);
    if (bridge.args["body"]["status"] == false) {
        bridge.call("Alert", {
            "duration": 7000,
            "label": bridge.args["body"]["exception"].join(", ")
        });
    } else {
        bridge.call("NavigatorPush", {
            "name": "Humidor",
            "type": "BottomSheet",
            "mail": bridge.state["EmailValue"],
            "link": {
                "template": "AccountCode.json",
            }
        });
    }
}

if (bridge.args["switch"] == "ConfirmCode") {
    console.log(bridge.state);
    bridge.call('Http', {
        "uri": "/signin",
        "body": {
            "code": bridge.state["CodeValue"] * 1,
            "mail": bridge.pageArgs["mail"]
        },
        "onResponse": {
            "jsInvoke": "Account.js",
            "args": {
                "switch": "ConfirmCodeResponse"
            }
        }
    });
}

if (bridge.args["switch"] == "ConfirmCodeResponse") {
    console.log(bridge.args);
    if (bridge.args["body"]["status"] == false) {
        bridge.call("Alert", {
            "duration": 7000,
            "label": bridge.args["body"]["exception"].join(", ")
        });
    } else {

    }
}