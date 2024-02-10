const map = {
    "settings": {
        "name": "Gravity",
        "creator": "SkapClientAdmin",
        "spawnPosition": [
            50,
            50
        ],
        "spawnArea": "Home",
        "version": null
    },
    "maps": [
        {   "name": "Home",
            "size": [
                100,
                100
            ],
            "objects": [
                {   "type": "obstacle",
                    "position": [
                        47, 53
                    ],
                    "size": [
                        6, 1
                    ]
                },
                {   "type": "teleporter",
                    "id": 0,
                    "position": [
                        50,
                        -10
                    ],
                    "size": [
                        20,
                        10
                    ],
                    "targetArea": "Negative",
                    "targetId": 0,
                    "dir": "2"
                },
                {   "type": "text",
                    "position": [
                        60,
                        -5
                    ],
                    "text": "Negative"
                },
                {   "type": "teleporter",
                    "id": 0,
                    "position": [
                        80,
                        -10
                    ],
                    "size": [
                        20,
                        10
                    ],
                    "targetArea": "-Infinity",
                    "targetId": 0,
                    "dir": "2"
                },
                {   "type": "text",
                    "position": [
                        90,
                        -5
                    ],
                    "text": "-Infinity"
                },
                {   "type": "teleporter",
                    "id": 0,
                    "position": [
                        20,
                        -10
                    ],
                    "size": [
                        20,
                        10
                    ],
                    "targetArea": "Low",
                    "targetId": 0,
                    "dir": "2"
                },
                {   "type": "text",
                    "position": [
                        30,
                        -5
                    ],
                    "text": "Low"
                },
                {   "type": "teleporter",
                    "id": 0,
                    "position": [
                        -10,
                        40
                    ],
                    "size": [
                        10,
                        20
                    ],
                    "targetArea": "Zero",
                    "targetId": 0,
                    "dir": "1"
                },
                {   "type": "text",
                    "position": [
                        -5,
                        50
                    ],
                    "text": "Zero"
                },
                {   "type": "teleporter",
                    "id": 0,
                    "position": [
                        20,
                        100
                    ],
                    "size": [
                        20,
                        10
                    ],
                    "targetArea": "High",
                    "targetId": 0,
                    "dir": "0"
                },
                {   "type": "text",
                    "position": [
                        30,
                        105
                    ],
                    "text": "High"
                },
                {   "type": "teleporter",
                    "id": 0,
                    "position": [
                        80,
                        100
                    ],
                    "size": [
                        20,
                        10
                    ],
                    "targetArea": "Infinity",
                    "targetId": 0,
                    "dir": "0"
                },
                {   "type": "text",
                    "position": [
                        90,
                        105
                    ],
                    "text": "Infinity"
                }
            ]
        },
        {   "name": "Zero",
            "size": [
                300,
                300
            ],
            "gravity": 0.00001,
            "objects": [
                {
                    "type": "teleporter",
                    "id": 0,
                    "position": [
                        -20,
                        140
                    ],
                    "size": [
                        10,
                        20
                    ],
                    "targetArea": "Home",
                    "targetId": 0,
                    "dir": "1"
                }
            ]
        },
        {   "name": "Negative",
            "size": [
                300,
                300
            ],
            "gravity": -100,
            "objects": [
                {
                    "type": "teleporter",
                    "id": 0,
                    "position": [
                        0,
                        310
                    ],
                    "size": [
                        20,
                        10
                    ],
                    "targetArea": "Home",
                    "targetId": 0,
                    "dir": 0
                }
            ]
        },
        {   "name": "Low",
            "size": [
                300,
                300
            ],
            "gravity": 50,
            "objects": [
                {
                    "type": "teleporter",
                    "id": 0,
                    "position": [
                        0,
                        -20
                    ],
                    "size": [
                        20,
                        10
                    ],
                    "targetArea": "Home",
                    "targetId": 0,
                    "dir": "2"
                }
            ]
        },
        {   "name": "High",
            "size": [
                300,
                300
            ],
            "gravity": 200,
            "objects": [
                {
                    "type": "teleporter",
                    "id": 0,
                    "position": [
                        0,
                        310
                    ],
                    "size": [
                        20,
                        10
                    ],
                    "targetArea": "Home",
                    "targetId": 0,
                    "dir": 0
                }
            ]
        },
        {   "name": "Infinity",
            "size": [
                300,
                300
            ],
            "gravity": Infinity,
            "objects": [
                {
                    "type": "teleporter",
                    "id": 0,
                    "position": [
                        0,
                        -20
                    ],
                    "size": [
                        20,
                        10
                    ],
                    "targetArea": "Home",
                    "targetId": 0,
                    "dir": "2"
                }
            ]
        },
        {   "name": "-Infinity",
            "size": [
                300,
                300
            ],
            "gravity": -Infinity,
            "objects": [
                {
                    "type": "teleporter",
                    "id": 0,
                    "position": [
                        0,
                        310
                    ],
                    "size": [
                        20,
                        10
                    ],
                    "targetArea": "Home",
                    "targetId": 0,
                    "dir": 0
                }
            ]
        }
    ]
};
map;