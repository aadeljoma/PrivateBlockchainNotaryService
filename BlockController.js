const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./Block.js');
const BlockChainClass = require('./BlockChain.js');
const RequestClass = require('./Request.js');
const MempoolClass = require('./Mempool.js');
const ValidRequestClass = require('./ValidRequest.js');
const StarClass = require('./Star.js');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app 
     */
    constructor(app) {
        this.app = app;
        this.Blockchain = new BlockChainClass.Blockchain();
        this.Request = new RequestClass.Request();
        this.Mempool = new MempoolClass.Mempool();
        this.ValidRequest = new ValidRequestClass.ValidRequest();
        this.validateRequest();
        this.validateRequestByWallet();
        this.getStarBlockByHash();
        this.getStarBlockByAddress();
        this.getBlockByHeight();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByHeight() {
        this.app.get("/block/:height", (req, res) => {
            this.Blockchain.getBlock(req.params.height).then((block) => {
                res.send(JSON.parse(block));
            }).catch(function (error) {
                console.log("Failed!", error);
            })
        });
    }

    /**
     * Implement a GET Endpoint to retrieve a block by hash, url: "/api/stars/:hash"
     */
    getStarBlockByHash() {
        this.app.get("/stars/hash/:hash", (req, res) => {
            this.Blockchain.getBlockByHash(req.params.hash).then((block) => {
                res.send(JSON.parse(block));
            }).catch(function (error) {
                console.log("Failed!", error);
            })
        });
    }

    /**
     * Implement a GET Endpoint to retrieve a block by hash, url: "/api/stars/:hash"
     */
    getStarBlockByAddress() {
        this.app.get("/stars/address/:address", (req, res) => {
            this.Blockchain.getBlockByAddress(req.params.address).then((blocks) => {
                res.send(blocks);
            }).catch(function (error) {
                console.log("Failed!", error);
            })
        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock() {
        this.app.post("/block", (req, res) => {
            if (req.body.body !== "") {
                if (this.verifyAddressRequest(req.body.address) == true) {
                    let newStar = new StarClass.Star(req.body.address, req.body.star.dec, req.body.star.ra, req.body.star.story);
                    let newBlock = new BlockClass.Block(newStar);
                    this.Blockchain.addBlock(newBlock).then((block) => {
                        this.Mempool.mempool[req.body.address] = null;
                        this.Mempool.mempoolValid[req.body.address] = null;
                        res.json(block);
                    }).catch(function (error) {
                        console.log("Failed!", error);
                    });
                } else {
                    throw new Error("Request address is not valid");
                }
            } else {
                throw new Error("Body of a block can not be empty");
            }
        });
    }

    /**
     * Implement a POST Endpoint to validate requests, url: "/requestValidation"
     */
    validateRequest() {
        this.app.post("/requestValidation", (req, res) => {
            let mempool = this.Mempool;
            let request = this.Request;
            request = mempool.addRequestValidation(req.body.address);
            const TimeoutRequestsWindowTime = 5 * 60 * 1000;
            mempool.timeoutRequests[request.walletAddress] = setTimeout(function () { mempool.removeValidationRequest(request.walletAddress) }, TimeoutRequestsWindowTime);
            res.json(request);
        });

    }

    /**
     * Implement a POST Endpoint to validate requests by wallet, url: "/message-signature/validate"
     */
    validateRequestByWallet() {
        this.app.post("/message-signature/validate", (req, res) => {
            let mempool = this.Mempool;
            let validRequest = this.ValidRequest;
            validRequest = mempool.validateRequestByWallet(req.body.address, req.body.signature);
            res.json(validRequest);
        });
    }

    verifyAddressRequest(address) {
        if (this.Mempool.mempoolValid[address] != null && this.Mempool.mempoolValid[address].status.messageSignature) {
            return true;
        } else {
            return false;
        }
    }
}
/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app); }