use('aruba-catalog');

db.createCollection("catalog_products");
db.catalog_products.insertMany([
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
            "code": "023d0cf0-8cdc-4b2a-95a7-8bb9e68f9bf5",
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
            "code": "ffc77475-0ede-427c-b4a6-0e64e6a0322b",
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
            "code": "d4a7199e-0b93-407c-9196-ce8745c22453",
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
            "code": "3d12dcc0-de18-48c9-9ee4-588bb699d6b4",
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
            "code": "f055b7a8-f092-4f9c-b5d6-7ab45067a5a4",
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
            "code": "b5052a43-60d0-4041-9d5d-448d30c48f0c",
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
            "code": "e74747dd-67c9-4af5-8358-551daa5a67a7",
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
            "code": "26ab74de-8b07-44b5-825f-0dfc3811bdd5",
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
            "code": "a3c48e2e-e738-41b2-8f84-dad8c8ed6251",
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
            "code": "f0510b08-ca36-4513-a436-c375c0a071b6",
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
            "code": "297a0b5b-f45c-4fb3-9ed7-c316b71ea87d",
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
            "code": "a427855a-4387-4888-bcfe-cb74882a50c3",
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
            "code": "34010e77-8cbe-46b1-8313-2a8916a3b70a",
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
            "code": "6631c0dc-bd06-48fe-8b1a-3d68ff5bc8d5",
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
            "code": "4fdc15b0-832a-41d4-9a96-0c4d71ea5cb6",
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
            "code": "22454b5b-d88b-4d3a-b1ee-6175c7fb3cbd",
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
            "code": "18255a03-316a-439f-99d5-e0d378f04bb8",
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
            "code": "a41df964-d645-45c0-8aa0-5b324f9765a4",
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
            "code": "60e1a067-61fe-4fb8-b942-f2d77710aa9c",
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
            "code": "77af94e4-9b5e-4402-83af-f8cd272d085b",
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
            "code": "4fdc15b0-832a-41d4-9a96-0c4d71ea5cb6",
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
            "code": "6cb2e8cd-f182-4bb8-a56a-581c83e0770e",
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
            "code": "ee8e150d-9c47-4d0d-a4f5-34c6166051ed",
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
            "code": "971bd15b-ab61-493d-a121-edd76cb87c14",
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
            "code": "7ab8792b-3547-44bb-a058-9109227dcde5",
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

