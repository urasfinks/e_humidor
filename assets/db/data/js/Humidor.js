if (bridge.args["switch"] == "constructor") {
    if (bridge.pageArgs != undefined) {
        bridge.call('DbQuery', {
            "sql": "select * from data where key_data = ? and parent_uuid_data = ? order by id_data",
            "args": ["cigar", bridge.pageArgs["link"]["humidor"]],
            "onFetch": {
                "jsInvoke": "Humidor.js",
                "args": {
                    "includeStateData": true,
                    "switch": "checkCountData"
                }
            }
        });
    }
}

if (bridge.args["switch"] == "onRemove") {
    //console.log();
    bridge.call('DbQuery', {
        "sql": "delete from data where key_data = ? and uuid_data = ?",
        "args": ["cigar", bridge.args["uuid_cigar"]],
        "onFetch": {
            "jsInvoke": "Humidor.js",
            "args": {
                "includePageArgument": true,
                "switch": "constructor"
            }
        }
    });
}

if (bridge.args["switch"] == "checkCountData") {
    bridge.call('SetStateData', {
        "key": "count",
        "value": bridge.args["fetchDb"].length + ""
    });
    let result = [];
    let brand = {};
    for (let i = 0; i < bridge.args["fetchDb"].length; i++) {
        let curBrand = bridge.args["fetchDb"][i]["value_data"]["brand"];
        if (brand[curBrand] == undefined) {
            brand[curBrand] = [];
        }
        brand[curBrand].push(bridge.args["fetchDb"][i]);
    }
    let tplCigar2 = {
        "flutterType": "Container",
        "padding": 18,
        "child": {
            "flutterType": "Row",
            "newContext": false,
            "crossAxisAlignment": "start",
            "children": [
                {
                    "flutterType": "Expanded",
                    "child": {
                        "flutterType": "Text",
                        "label": "Линейка: ${value_data.line}; Форма: ${value_data.shape}; Формат: ${value_data.format}\n${value_data.timestamp|timestampToDate(dd.MM.yyyy)}"
                    }
                },
                {
                    "flutterType": "SizedBox",
                    "width": 20
                },
                {
                    "flutterType": "Text",
                    "label": "${value_data.size}"
                }
            ]
        }
    };
    let tplCigar = {
        "flutterType": "Margin",
        "margin": "10,0,10,0",
        "child": {
            "flutterType": "Material",
            "color": "schema:onBackground",
            "child": {
                "flutterType": "InkWell",
                "onTap": {},
                "customBorder": {
                    "flutterType": "RoundedRectangleBorder",
                    "borderRadius": 5
                },
                "child": {
                    "flutterType": "Container",
                    "margin": "15,2,15,2",
                    "child": {
                        "flutterType": "Slidable",
                        "newContext": false,
                        "children": [
                            {
                                "flutterType": "SizedBox",
                                "width": 100,
                                "child": {
                                    "flutterType": "Row",
                                    "mainAxisAlignment": "center",
                                    "newContext": false,
                                    "children": [
                                        {
                                            "flutterType": "RawMaterialButton",
                                            "fillColor": "red",
                                            "padding": 10,
                                            "onPressed": {
                                                "jsInvoke": "Humidor.js",
                                                "args": {
                                                    "switch": "onRemove",
                                                    "uuid_cigar": "${uuid_data}",
                                                    "templateArguments": [
                                                        "uuid_cigar"
                                                    ]
                                                }
                                            },
                                            "icon": {
                                                "flutterType": "Icon",
                                                "src": "delete_outline",
                                                "color": "white",
                                                "size": 20
                                            }
                                        }
                                    ]
                                }
                            }
                        ],
                        "child": {
                            "flutterType": "Row",
                            "newContext": false,
                            "crossAxisAlignment": "start",
                            "children": [
                                {
                                    "flutterType": "Expanded",
                                    "child": {
                                        "flutterType": "Column",
                                        "crossAxisAlignment": "start",
                                        "newContext": false,
                                        "children": [
                                            {
                                                "flutterType": "Text",
                                                "label": "${value_data.line}; Формат: ${value_data.shape} - ${value_data.format}",
                                                "style": {
                                                    "flutterType": "TextStyle",
                                                    "fontSize": 15
                                                }
                                            },
                                            {
                                                "flutterType": "Opacity",
                                                "opacity": 0.4,
                                                "child": {
                                                    "flutterType": "Text",
                                                    "label": "${value_data.timestamp|timestampToDate(dd.MM.yyyy)}"
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "flutterType": "SizedBox",
                                    "width": 20
                                },
                                {
                                    "flutterType": "Text",
                                    "label": "${value_data.size}"
                                }
                            ]
                        }
                    }
                }
            }
        }
    };
    for (let key in brand) {
        result.push({
            "template": {
                "flutterType": "Container",
                "margin": "22,17,22,17",
                "child": {
                    "flutterType": "Row",
                    "newContext": false,
                    "crossAxisAlignment": "start",
                    "children": [
                        {
                            "flutterType": "Expanded",
                            "child": {
                                "flutterType": "Text",
                                "label": key,
                                "style": {
                                    "flutterType": "TextStyle",
                                    "fontSize": 17,
                                    "fontWeight": "bold"
                                }
                            }
                        },
                        {
                            "flutterType": "SizedBox",
                            "width": 20
                        },
                        {
                            "flutterType": "Text",
                            "label": brand[key].length
                        }
                    ]
                }
            }
        });
        result.push({
            "template": {
                "flutterType": "Container",
                "margin": "10,0,10,0",
                "height": 10,
                "width": "infinity",
                "decoration": {
                    "flutterType": "BoxDecoration",
                    "color": "schema:onBackground",
                    "borderRadius": "10,10,0,0"
                }
            }
        });
        for (let i = 0; i < brand[key].length; i++) {
            brand[key][i]["template"] = tplCigar;
            result.push(brand[key][i]);
            if (i < brand[key].length - 1) {
                result.push({
                    "template": {
                        "flutterType": "Container",
                        "margin": "10,0,10,0",
                        "height": 10,
                        "color": "schema:onBackground"
                    }
                });
                result.push({
                    "template": {
                        "flutterType": "Divider",
                        "thickness": 1,
                        "height": 1,
                        "color": "schema:background"
                    }
                });
                result.push({
                    "template": {
                        "flutterType": "Container",
                        "margin": "10,0,10,0",
                        "height": 10,
                        "color": "schema:onBackground"
                    }
                });
            }
        }
        result.push({
            "template": {
                "flutterType": "Container",
                "margin": "10,0,10,0",
                "height": 10,
                "width": "infinity",
                "decoration": {
                    "flutterType": "BoxDecoration",
                    "color": "schema:onBackground",
                    "borderRadius": "0,0,10,10"
                }
            }
        });
    }
    //console.log(brand);
    bridge.call('SetStateData', {
        "key": "CigarList",
        "value": result
    });
}

