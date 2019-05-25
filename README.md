# Private Blockchain API

In this project I have created an API for my private blockchain star rotary service with Express framework.

## Steps to follow

1. Open the terminal and navigate to location of my downloaded project on your computer.
2. Type `node app.js`.
3. Test my endpoints with Postman. 
4. To request validation (POST) type http://localhost:8000/requestValidation and click on send.
    the expected result is:
    {
        "walletAddress": "1B4CGV54gNDQdw4U4yYQqhyeEC5pFGuWR7",
        "requestTimeStamp": "1546608950",
        "message": "1B4CGV54gNDQdw4U4yYQqhyeEC5pFGuWR7:1546608950:starRegistry",
        "validationWindow": 300
    }
5. To validate the message signature (POST) type http://localhost:8000/message-signature/validate with the address and       signature in the body of the request, kindly generate the signature from electrum.
   the expected result is:
   {
        "registerStar": true,
        "status": {
            "address": "1B4CGV54gNDQdw4U4yYQqhyeEC5pFGuWR7",
            "requestTimeStamp": "1546608950",
            "message": "1B4CGV54gNDQdw4U4yYQqhyeEC5pFGuWR7:1546608950:starRegistry",
            "validationWindow": 300,
            "messageSignature": true
        }
    }
6. To add star block (POST) type http://localhost:8000/block with the star in the body 
    {
        "address": "1B4CGV54gNDQdw4U4yYQqhyeEC5pFGuWR7",
        "star": {
            "dec": "68° 52' 56.9",
            "ra": "16h 29m 1.0s",
            "story": "Found star using https://www.google.com/sky/"
        }
    }
    the expected result is:
    {
        "hash": "29fd0be8f01963ea6990567334c0d7a5ae0f79ac782eedee0777adbe2bbbd9f2",
        "height": 1,
        "body": {
            "address": "1B4CGV54gNDQdw4U4yYQqhyeEC5pFGuWR7",
            "star": {
                "dec": "68° 52' 56.9",
                "ra": "16h 29m 1.0s",
                "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
                "storyDecoded": "Found star using https://www.google.com/sky/"
            }
        }
        "time": "1546609402",
        "previousBlockHash": "701dd3cf5e4b3b175ecadbbe520550ae141c625192efbf4e5c4cb2ab33f17173"
    }
7. To get block by height (GET) type http://localhost:8000/block/1.
   the expected result is:
   {
        "hash": "29fd0be8f01963ea6990567334c0d7a5ae0f79ac782eedee0777adbe2bbbd9f2",
        "height": 1,
        "body": {
            "address": "1B4CGV54gNDQdw4U4yYQqhyeEC5pFGuWR7",
            "star": {
                "dec": "68° 52' 56.9",
                "ra": "16h 29m 1.0s",
                "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
                "storyDecoded": "Found star using https://www.google.com/sky/"
            }
        }
        "time": "1546609402",
        "previousBlockHash": "701dd3cf5e4b3b175ecadbbe520550ae141c625192efbf4e5c4cb2ab33f17173"
    }

8. To get block by hash (GET) type           http://localhost:8000/stars/hash/29fd0be8f01963ea6990567334c0d7a5ae0f79ac782eedee0777adbe2bbbd9f2
the expected result is: 

{
    "hash": "29fd0be8f01963ea6990567334c0d7a5ae0f79ac782eedee0777adbe2bbbd9f2",
    "height": 1,
    "body": {
        "address": "1B4CGV54gNDQdw4U4yYQqhyeEC5pFGuWR7",
        "star": {
            "dec": "68° 52' 56.9",
            "ra": "16h 29m 1.0s",
            "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
            "storyDecoded": "Found star using https://www.google.com/sky/"
        }
    },
    "time": "1546609402",
    "previousBlockHash": "701dd3cf5e4b3b175ecadbbe520550ae141c625192efbf4e5c4cb2ab33f17173"
}
9. To get blocks by address (GET) type http://localhost:8000/stars/address/1B4CGV54gNDQdw4U4yYQqhyeEC5pFGuWR7
   The expected result is:
   [
    {
        "hash": "29fd0be8f01963ea6990567334c0d7a5ae0f79ac782eedee0777adbe2bbbd9f2",
        "height": 1,
        "body": {
            "address": "1B4CGV54gNDQdw4U4yYQqhyeEC5pFGuWR7",
            "star": {
                "dec": "68° 52' 56.9",
                "ra": "16h 29m 1.0s",
                "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
                "storyDecoded": "Found star using https://www.google.com/sky/"
            }
        },
        "time": "1546609402",
        "previousBlockHash": "701dd3cf5e4b3b175ecadbbe520550ae141c625192efbf4e5c4cb2ab33f17173"
    },
    {
        "hash": "932de1eea2a7e7e0ca0518d1a444d8e2cfd76e312db37719b621c9b168d3817c",
        "height": 2,
        "body": {
            "address": "1B4CGV54gNDQdw4U4yYQqhyeEC5pFGuWR7",
            "star": {
                "dec": "68° 52' 56.9",
                "ra": "16h 29m 1.0s",
                "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
                "storyDecoded": "Found star using https://www.google.com/sky/"
            }
        },
        "time": "1546609523",
        "previousBlockHash": "29fd0be8f01963ea6990567334c0d7a5ae0f79ac782eedee0777adbe2bbbd9f2"
    },
    {
        "hash": "ce3421cc478ebc6197892923cae5f127500138ec2665f0564699497d2674d479",
        "height": 3,
        "body": {
            "address": "1B4CGV54gNDQdw4U4yYQqhyeEC5pFGuWR7",
            "star": {
                "dec": "68° 52' 56.9",
                "ra": "16h 29m 1.0s",
                "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
                "storyDecoded": "Found star using https://www.google.com/sky/"
            }
        },
        "time": "1546609524",
        "previousBlockHash": "932de1eea2a7e7e0ca0518d1a444d8e2cfd76e312db37719b621c9b168d3817c"
    },
    {
        "hash": "f53e58a61348af0d40c06761c8a2af0bc3bdf2f337669d4a657056e631bdf570",
        "height": 4,
        "body": {
            "address": "1B4CGV54gNDQdw4U4yYQqhyeEC5pFGuWR7",
            "star": {
                "dec": "68° 52' 56.9",
                "ra": "16h 29m 1.0s",
                "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
                "storyDecoded": "Found star using https://www.google.com/sky/"
            }
        },
        "time": "1546609524",
        "previousBlockHash": "ce3421cc478ebc6197892923cae5f127500138ec2665f0564699497d2674d479"
    },
    {
        "hash": "acbd5d2971d65ecf42c8a09356db462a81414c1cf84b056c5aba9c2f11e43bb3",
        "height": 5,
        "body": {
            "address": "1B4CGV54gNDQdw4U4yYQqhyeEC5pFGuWR7",
            "star": {
                "dec": "68° 52' 56.9",
                "ra": "16h 29m 1.0s",
                "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
                "storyDecoded": "Found star using https://www.google.com/sky/"
            }
        },
        "time": "1546609525",
        "previousBlockHash": "f53e58a61348af0d40c06761c8a2af0bc3bdf2f337669d4a657056e631bdf570"
    },
    {
        "hash": "2a359172f44f7e05d1ce2fea981fa09c41f98710066de9268c7e1b993cad29a5",
        "height": 6,
        "body": {
            "address": "1B4CGV54gNDQdw4U4yYQqhyeEC5pFGuWR7",
            "star": {
                "dec": "68° 52' 56.9",
                "ra": "16h 29m 1.0s",
                "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
                "storyDecoded": "Found star using https://www.google.com/sky/"
            }
        },
        "time": "1546609525",
        "previousBlockHash": "acbd5d2971d65ecf42c8a09356db462a81414c1cf84b056c5aba9c2f11e43bb3"
    }
]
