use('aruba-catalog');

db.createCollection("catalog_products");
db.catalog_products.insertMany([
    {
        "_id": "ff615eba519c49ffbbd8a6e91ccd0765",
        "resourceName": "blockdisk",
        "resourceCategory": "disk",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 5e-05,
        "productName": "blockdisk",
        "flavor": null,
        "reservations": [
            {
                "term": "1 Month",
                "price": 4.75e-05
            },
            {
                "term": "1 Year",
                "price": 4.5e-05
            },
            {
                "term": "3 Years",
                "price": 4e-05
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "83dcd812afd8462cb3f17ed98decd42f",
        "resourceName": "elasticIp",
        "resourceCategory": "networking",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.005,
        "productName": "elasticIp",
        "flavor": null,
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.00475
            },
            {
                "term": "1 Year",
                "price": 0.0045
            },
            {
                "term": "3 Years",
                "price": 0.004
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "8108329f04a04fb39725607694801461",
        "resourceName": "kaas",
        "resourceCategory": "container",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.05,
        "productName": "masterHA",
        "flavor": null,
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.0475
            },
            {
                "term": "1 Year",
                "price": 0.045
            },
            {
                "term": "3 Years",
                "price": 0.04
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "9fd8ae455a7e4b34838bf184c881a68f",
        "resourceName": "kaas",
        "resourceCategory": "container",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.14,
        "productName": "kaasNode",
        "flavor": {
            "id": "41a4df9d024644d8996c7bb5db1d2109",
            "name": "K12A24",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "12",
            "ram": "24",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.133
            },
            {
                "term": "1 Year",
                "price": 0.126
            },
            {
                "term": "3 Years",
                "price": 0.112
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 5,
                "percentDiscount": 3.0
            },
            {
                "category": "Partner",
                "minimumUnits": 20,
                "percentDiscount": 8.0
            },
            {
                "category": "Premium",
                "minimumUnits": 50,
                "percentDiscount": 12.0
            }
        ]
    },
    {
        "_id": "05c3efc1c8d246aa9b76fc29db6111b6",
        "resourceName": "kaas",
        "resourceCategory": "container",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.19,
        "productName": "kaasNode",
        "flavor": {
            "id": "9efdc50169264acfb082205beefaee4f",
            "name": "K16A32",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "16",
            "ram": "32",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.1805
            },
            {
                "term": "1 Year",
                "price": 0.171
            },
            {
                "term": "3 Years",
                "price": 0.152
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 5,
                "percentDiscount": 3.0
            },
            {
                "category": "Partner",
                "minimumUnits": 20,
                "percentDiscount": 8.0
            },
            {
                "category": "Premium",
                "minimumUnits": 50,
                "percentDiscount": 12.0
            }
        ]
    },
    {
        "_id": "f809890a909e4e91a830b5e41c9018c7",
        "resourceName": "kaas",
        "resourceCategory": "container",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.28,
        "productName": "kaasNode",
        "flavor": {
            "id": "f9c8b4cecf80445db5442d0f0b0c98f0",
            "name": "K24A48",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "24",
            "ram": "48",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.266
            },
            {
                "term": "1 Year",
                "price": 0.252
            },
            {
                "term": "3 Years",
                "price": 0.224
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 5,
                "percentDiscount": 3.0
            },
            {
                "category": "Partner",
                "minimumUnits": 20,
                "percentDiscount": 8.0
            },
            {
                "category": "Premium",
                "minimumUnits": 50,
                "percentDiscount": 12.0
            }
        ]
    },
    {
        "_id": "5e6a1900a65742a8b994b8a6d47593f6",
        "resourceName": "kaas",
        "resourceCategory": "container",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.026,
        "productName": "kaasNode",
        "flavor": {
            "id": "47495b9ead404f8c82e3700d53aa68af",
            "name": "K2A4",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "2",
            "ram": "4",
            "disk": "40"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.0247
            },
            {
                "term": "1 Year",
                "price": 0.0234
            },
            {
                "term": "3 Years",
                "price": 0.0208
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "7dd112cae86b400283ca97cbad19032d",
        "resourceName": "kaas",
        "resourceCategory": "container",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.04,
        "productName": "kaasNode",
        "flavor": {
            "id": "944c1e017b594733b0367636ffe90cf3",
            "name": "K2A8R",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "2",
            "ram": "8",
            "disk": "80"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.038
            },
            {
                "term": "1 Year",
                "price": 0.036
            },
            {
                "term": "3 Years",
                "price": 0.032
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "0c02b9e1d81940b0bad1005f1b18b141",
        "resourceName": "kaas",
        "resourceCategory": "container",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.38,
        "productName": "kaasNode",
        "flavor": {
            "id": "9d455579a30b487885d5ece6a4dc4651",
            "name": "K32A64",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "32",
            "ram": "64",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.361
            },
            {
                "term": "1 Year",
                "price": 0.342
            },
            {
                "term": "3 Years",
                "price": 0.304
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "4d24808b959d48d0b72cfbb51dbca036",
        "resourceName": "kaas",
        "resourceCategory": "container",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.074,
        "productName": "kaasNode",
        "flavor": {
            "id": "3c5b650f640047c2968bef2fb9a53e56",
            "name": "K4A16R",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "4",
            "ram": "16",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.0703
            },
            {
                "term": "1 Year",
                "price": 0.0666
            },
            {
                "term": "3 Years",
                "price": 0.0592
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "c2ec0c915904480fb67106c103088c0a",
        "resourceName": "kaas",
        "resourceCategory": "container",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.05,
        "productName": "kaasNode",
        "flavor": {
            "id": "827ef08235384cdabb3310c0d7e93fb4",
            "name": "K4A8",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "4",
            "ram": "8",
            "disk": "80"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.0475
            },
            {
                "term": "1 Year",
                "price": 0.045
            },
            {
                "term": "3 Years",
                "price": 0.04
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "66079ef91da04a91bffeb104545d3464",
        "resourceName": "kaas",
        "resourceCategory": "container",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.095,
        "productName": "kaasNode",
        "flavor": {
            "id": "5733158be46843de9ac0e9cf2eab3390",
            "name": "K8A16",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "8",
            "ram": "16",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.09025
            },
            {
                "term": "1 Year",
                "price": 0.0855
            },
            {
                "term": "3 Years",
                "price": 0.076
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "83cbf1eea960400492515a54f2064420",
        "resourceName": "kaas",
        "resourceCategory": "container",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.135,
        "productName": "kaasNode",
        "flavor": {
            "id": "1d95d5be4ec3473ba5258e3c1a8e6a1e",
            "name": "K8A32R",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "8",
            "ram": "32",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.12825
            },
            {
                "term": "1 Year",
                "price": 0.1215
            },
            {
                "term": "3 Years",
                "price": 0.108
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "e22e3b5294734359a1d4c763f4af0b2b",
        "resourceName": "kaas",
        "resourceCategory": "container",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.26,
        "productName": "kaasNode",
        "flavor": {
            "id": "3868e4e491f94708bc36fb3bf419eb30",
            "name": "K16A64R",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "16",
            "ram": "64",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.247
            },
            {
                "term": "1 Year",
                "price": 0.234
            },
            {
                "term": "3 Years",
                "price": 0.208
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "104af25a94ed410fa53059afe0f0c349",
        "resourceName": "kaas",
        "resourceCategory": "container",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.5,
        "productName": "kaasNode",
        "flavor": {
            "id": "51411ebf13db4c6bb921d6f25772effd",
            "name": "K32A128R",
            "code": "null",
            "osPlatform": "windows",
            "cpu": "32",
            "ram": "128",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.475
            },
            {
                "term": "1 Year",
                "price": 0.45
            },
            {
                "term": "3 Years",
                "price": 0.4
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "81eb9eebb5d941c5a153b7bcbf3f822a",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.332,
        "productName": "cloudServer",
        "flavor": {
            "id": "ba85e475712a4f13bf6aa74e4f6176a6",
            "name": "CSO12A24",
            "code": "null",
            "osPlatform": "windows",
            "cpu": "12",
            "ram": "24",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.3154
            },
            {
                "term": "1 Year",
                "price": 0.2988
            },
            {
                "term": "3 Years",
                "price": 0.2656
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "d562642b7b5246cfb22d09c46c560481",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.446,
        "productName": "cloudServer",
        "flavor": {
            "id": "d93c200189a34b7cbd6ffe572020fbac",
            "name": "CSO16A32",
            "code": "null",
            "osPlatform": "windows",
            "cpu": "16",
            "ram": "32",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.4237
            },
            {
                "term": "1 Year",
                "price": 0.4014
            },
            {
                "term": "3 Years",
                "price": 0.3568
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 5,
                "percentDiscount": 3.0
            },
            {
                "category": "Partner",
                "minimumUnits": 20,
                "percentDiscount": 8.0
            },
            {
                "category": "Premium",
                "minimumUnits": 50,
                "percentDiscount": 12.0
            }
        ]
    },
    {
        "_id": "de2a00415f804e269026e50071e8783c",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.516,
        "productName": "cloudServer",
        "flavor": {
            "id": "d57e7b1b6a714803abec060be3b08895",
            "name": "CSO16A64",
            "code": "null",
            "osPlatform": "windows",
            "cpu": "16",
            "ram": "64",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.4902
            },
            {
                "term": "1 Year",
                "price": 0.4644
            },
            {
                "term": "3 Years",
                "price": 0.4128
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 5,
                "percentDiscount": 3.0
            },
            {
                "category": "Partner",
                "minimumUnits": 20,
                "percentDiscount": 8.0
            },
            {
                "category": "Premium",
                "minimumUnits": 50,
                "percentDiscount": 12.0
            }
        ]
    },
    {
        "_id": "3346766498f24557bc325e618b7505f0",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.036,
        "productName": "cloudServer",
        "flavor": {
            "id": "ba621531c04848d28649d683d87b6b7f",
            "name": "CSO1A4",
            "code": "null",
            "osPlatform": "windows",
            "cpu": "1",
            "ram": "4",
            "disk": "40"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.0342
            },
            {
                "term": "1 Year",
                "price": 0.0324
            },
            {
                "term": "3 Years",
                "price": 0.0288
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "d9ad5f93a70247b781562655e5bd94dd",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.664,
        "productName": "cloudServer",
        "flavor": {
            "id": "545407b4595f4905ab187c12f8ddc2f1",
            "name": "CSO24A48",
            "code": "null",
            "osPlatform": "windows",
            "cpu": "24",
            "ram": "48",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.6318
            },
            {
                "term": "1 Year",
                "price": 0.5976
            },
            {
                "term": "3 Years",
                "price": 0.5312
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "f66cbb71a6a342518da73a92bcae3545",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.058,
        "productName": "cloudServer",
        "flavor": {
            "id": "4cb1eda3373a489db4dc58f4401f7c15",
            "name": "CSO2A4",
            "code": "null",
            "osPlatform": "windows",
            "cpu": "2",
            "ram": "4",
            "disk": "40"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.0551
            },
            {
                "term": "1 Year",
                "price": 0.0522
            },
            {
                "term": "3 Years",
                "price": 0.0464
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 5,
                "percentDiscount": 3.0
            },
            {
                "category": "Partner",
                "minimumUnits": 20,
                "percentDiscount": 8.0
            },
            {
                "category": "Premium",
                "minimumUnits": 50,
                "percentDiscount": 12.0
            }
        ]
    },
    {
        "_id": "0d77a5c85b4844789594e793861088fc",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.072,
        "productName": "cloudServer",
        "flavor": {
            "id": "8292e60e76904131b54ee7654acfca6b",
            "name": "CSO2A8",
            "code": "null",
            "osPlatform": "windows",
            "cpu": "2",
            "ram": "8",
            "disk": "80"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.0684
            },
            {
                "term": "1 Year",
                "price": 0.0648
            },
            {
                "term": "3 Years",
                "price": 0.0576
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 5,
                "percentDiscount": 3.0
            },
            {
                "category": "Partner",
                "minimumUnits": 20,
                "percentDiscount": 8.0
            },
            {
                "category": "Premium",
                "minimumUnits": 50,
                "percentDiscount": 12.0
            }
        ]
    },
    {
        "_id": "d83be8c908ff41e89333a9cb689dae7e",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.892,
        "productName": "cloudServer",
        "flavor": {
            "id": "c3c5820e6f87479d8cd613035df3affb",
            "name": "CSO32A64",
            "code": "null",
            "osPlatform": "windows",
            "cpu": "32",
            "ram": "64",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.8474
            },
            {
                "term": "1 Year",
                "price": 0.8028
            },
            {
                "term": "3 Years",
                "price": 0.7136
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "ee65c4841349405bba4f2640a874b17e",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.138,
        "productName": "cloudServer",
        "flavor": {
            "id": "16ccee107017483bb5ad9172b773944c",
            "name": "CSO4A16",
            "code": "null",
            "osPlatform": "windows",
            "cpu": "4",
            "ram": "16",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.1311
            },
            {
                "term": "1 Year",
                "price": 0.1242
            },
            {
                "term": "3 Years",
                "price": 0.1104
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "3c823fc9bb8942b5b8e9a2dd7ec2c8c4",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.114,
        "productName": "cloudServer",
        "flavor": {
            "id": "4f58aae0db4d4ffc91a0aad443f10482",
            "name": "CSO4A8",
            "code": "null",
            "osPlatform": "windows",
            "cpu": "4",
            "ram": "8",
            "disk": "80"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.1083
            },
            {
                "term": "1 Year",
                "price": 0.1026
            },
            {
                "term": "3 Years",
                "price": 0.0912
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "eb5d5b03a256488cad6da75555a0fb9f",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.223,
        "productName": "cloudServer",
        "flavor": {
            "id": "09df595512674ac99d47a0669b35acd5",
            "name": "CSO8A16",
            "code": "null",
            "osPlatform": "windows",
            "cpu": "8",
            "ram": "16",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.21185
            },
            {
                "term": "1 Year",
                "price": 0.2007
            },
            {
                "term": "3 Years",
                "price": 0.1784
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "c281b32965c54a61b5f36cae21fc2159",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.263,
        "productName": "cloudServer",
        "flavor": {
            "id": "a2310aed66d94d1fb3e8c34c8a877f78",
            "name": "CSO8A32",
            "code": "null",
            "osPlatform": "windows",
            "cpu": "8",
            "ram": "32",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.24985
            },
            {
                "term": "1 Year",
                "price": 0.237
            },
            {
                "term": "3 Years",
                "price": 0.2104
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "d9af774e919b4a17a03265d49d395440",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.14,
        "productName": "cloudServer",
        "flavor": {
            "id": "2f24c15ac8a04e9c8196ed0cda40e38c",
            "name": "CSO12A24",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "12",
            "ram": "24",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.133
            },
            {
                "term": "1 Year",
                "price": 0.126
            },
            {
                "term": "3 Years",
                "price": 0.112
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 5,
                "percentDiscount": 3.0
            },
            {
                "category": "Partner",
                "minimumUnits": 20,
                "percentDiscount": 8.0
            },
            {
                "category": "Premium",
                "minimumUnits": 50,
                "percentDiscount": 12.0
            }
        ]
    },
    {
        "_id": "1f610a8b696d47629492d9b0ce347408",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.19,
        "productName": "cloudServer",
        "flavor": {
            "id": "8b6a9d7bae6547868e939896a3417126",
            "name": "CSO16A32",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "16",
            "ram": "32",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.1805
            },
            {
                "term": "1 Year",
                "price": 0.171
            },
            {
                "term": "3 Years",
                "price": 0.152
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 5,
                "percentDiscount": 3.0
            },
            {
                "category": "Partner",
                "minimumUnits": 20,
                "percentDiscount": 8.0
            },
            {
                "category": "Premium",
                "minimumUnits": 50,
                "percentDiscount": 12.0
            }
        ]
    },
    {
        "_id": "6016b250c539443bacf622a592f47d01",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.26,
        "productName": "cloudServer",
        "flavor": {
            "id": "11a1a4e5ebe7488ea6f8d311b2a89ca3",
            "name": "CSO16A64",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "16",
            "ram": "64",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.247
            },
            {
                "term": "1 Year",
                "price": 0.234
            },
            {
                "term": "3 Years",
                "price": 0.208
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "661a9c634d1849198bac469545fd7cbd",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.013,
        "productName": "cloudServer",
        "flavor": {
            "id": "cfb3b8504a2744eea82a21af0e32de32",
            "name": "CSO1A2",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "1",
            "ram": "2",
            "disk": "20"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.01235
            },
            {
                "term": "1 Year",
                "price": 0.0117
            },
            {
                "term": "3 Years",
                "price": 0.0104
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 5,
                "percentDiscount": 3.0
            },
            {
                "category": "Partner",
                "minimumUnits": 20,
                "percentDiscount": 8.0
            },
            {
                "category": "Premium",
                "minimumUnits": 50,
                "percentDiscount": 12.0
            }
        ]
    },
    {
        "_id": "3667dbc8f48144fc8160364d45fdd21e",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.02,
        "productName": "cloudServer",
        "flavor": {
            "id": "d0449f8bc9b24318b3cc281af5fe5385",
            "name": "CSO1A4",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "1",
            "ram": "4",
            "disk": "40"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.019
            },
            {
                "term": "1 Year",
                "price": 0.018
            },
            {
                "term": "3 Years",
                "price": 0.016
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 5,
                "percentDiscount": 3.0
            },
            {
                "category": "Partner",
                "minimumUnits": 20,
                "percentDiscount": 8.0
            },
            {
                "category": "Premium",
                "minimumUnits": 50,
                "percentDiscount": 12.0
            }
        ]
    },
    {
        "_id": "6e8a460b7bb74400a0c6d5a26ed1e389",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.28,
        "productName": "cloudServer",
        "flavor": {
            "id": "8c4c91522c7f4ccd821ea44d5a50b0de",
            "name": "CSO24A48",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "24",
            "ram": "48",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.266
            },
            {
                "term": "1 Year",
                "price": 0.252
            },
            {
                "term": "3 Years",
                "price": 0.224
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "cffb72588b654719b53e22c1e05875a9",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.026,
        "productName": "cloudServer",
        "flavor": {
            "id": "8cfb1810fe3b44198a9f3a503148b0ea",
            "name": "CSO2A4",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "2",
            "ram": "4",
            "disk": "40"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.0247
            },
            {
                "term": "1 Year",
                "price": 0.0234
            },
            {
                "term": "3 Years",
                "price": 0.0208
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "cf8f912b807842c7840c4e3737fe3b22",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.04,
        "productName": "cloudServer",
        "flavor": {
            "id": "81e3697d2ea1489bb48f95e0889ac498",
            "name": "CSO2A8",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "2",
            "ram": "8",
            "disk": "80"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.038
            },
            {
                "term": "1 Year",
                "price": 0.036
            },
            {
                "term": "3 Years",
                "price": 0.032
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "88b8b065f3c646d2b3a270833126b0d2",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.38,
        "productName": "cloudServer",
        "flavor": {
            "id": "7dadf6d8190c4fc29a1706a65a0b492b",
            "name": "CSO32A64",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "32",
            "ram": "64",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.361
            },
            {
                "term": "1 Year",
                "price": 0.342
            },
            {
                "term": "3 Years",
                "price": 0.304
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "a0fa3de53c594d5a83e992b4e580dbe9",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.074,
        "productName": "cloudServer",
        "flavor": {
            "id": "58da34aa7de24fab9686ac6d57d8c6d5",
            "name": "CSO4A16",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "4",
            "ram": "16",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.0703
            },
            {
                "term": "1 Year",
                "price": 0.0666
            },
            {
                "term": "3 Years",
                "price": 0.0592
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 10,
                "percentDiscount": 5.0
            },
            {
                "category": "Partner",
                "minimumUnits": 50,
                "percentDiscount": 10.0
            },
            {
                "category": "Premium",
                "minimumUnits": 100,
                "percentDiscount": 15.0
            }
        ]
    },
    {
        "_id": "b0e479d3e4ce4f7299479ace1570730c",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.05,
        "productName": "cloudServer",
        "flavor": {
            "id": "d4772fcde0814a328e62b25dbb4dd996",
            "name": "CSO4A8",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "4",
            "ram": "8",
            "disk": "80"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.0475
            },
            {
                "term": "1 Year",
                "price": 0.045
            },
            {
                "term": "3 Years",
                "price": 0.04
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 5,
                "percentDiscount": 3.0
            },
            {
                "category": "Partner",
                "minimumUnits": 20,
                "percentDiscount": 8.0
            },
            {
                "category": "Premium",
                "minimumUnits": 50,
                "percentDiscount": 12.0
            }
        ]
    },
    {
        "_id": "598b8762eadf4433b0bb37eeccb40e65",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.095,
        "productName": "cloudServer",
        "flavor": {
            "id": "04655629aeae48c39bd0b74dc65304d8",
            "name": "CSO8A16",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "8",
            "ram": "16",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.09025
            },
            {
                "term": "1 Year",
                "price": 0.0855
            },
            {
                "term": "3 Years",
                "price": 0.076
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 5,
                "percentDiscount": 3.0
            },
            {
                "category": "Partner",
                "minimumUnits": 20,
                "percentDiscount": 8.0
            },
            {
                "category": "Premium",
                "minimumUnits": 50,
                "percentDiscount": 12.0
            }
        ]
    },
    {
        "_id": "2a1390c3c20c411fbe15b05ad5e17a5b",
        "resourceName": "cloudServer",
        "resourceCategory": "computing",
        "currencyCode": "EUR",
        "unitOfMeasure": "1 Hour",
        "unitPrice": 0.135,
        "productName": "cloudServer",
        "flavor": {
            "id": "1d1edf672e224e6ab23d630e224e40cd",
            "name": "CSO8A32",
            "code": "null",
            "osPlatform": "linux",
            "cpu": "8",
            "ram": "32",
            "disk": "120"
        },
        "reservations": [
            {
                "term": "1 Month",
                "price": 0.12825
            },
            {
                "term": "1 Year",
                "price": 0.1215
            },
            {
                "term": "3 Years",
                "price": 0.108
            }
        ],
        "tiers": [
            {
                "category": "Base",
                "minimumUnits": 5,
                "percentDiscount": 3.0
            },
            {
                "category": "Partner",
                "minimumUnits": 20,
                "percentDiscount": 8.0
            },
            {
                "category": "Premium",
                "minimumUnits": 50,
                "percentDiscount": 12.0
            }
        ]
    }
]);

