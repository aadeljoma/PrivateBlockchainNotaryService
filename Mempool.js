/* ===== Mempool Class ==============================
|  Class with a constructor for mempool			   |
|  ===============================================*/

const RequestClass = require('./Request.js');
const ValidRequestClass = require('./ValidRequest.js');
const bitcoinMessage = require('bitcoinjs-message');

class Mempool {
    constructor() {
        this.mempool = [];
        this.timeoutRequests = [];
        this.mempoolValid = [];
    }

    addRequestValidation(walletAddress) {
        const TimeoutRequestsWindowTime = 5 * 60 * 1000;
        if (this.mempool[walletAddress] != null) {
            let timeElapse = (new Date().getTime().toString().slice(0, -3)) - this.mempool[walletAddress].requestTimeStamp;
            let timeLeft = (TimeoutRequestsWindowTime / 1000) - timeElapse;
            this.mempool[walletAddress].validationWindow = timeLeft;
            return this.mempool[walletAddress];
        } else {
            let request = new RequestClass.Request(walletAddress);
            request.requestTimeStamp = new Date().getTime().toString().slice(0, -3);
            request.message = request.walletAddress + ":" + request.requestTimeStamp + ":starRegistry";
            let timeElapse = (new Date().getTime().toString().slice(0, -3)) - request.requestTimeStamp;
            let timeLeft = (TimeoutRequestsWindowTime / 1000) - timeElapse;
            request.validationWindow = timeLeft;
            this.mempool[walletAddress] = request;
            return this.mempool[walletAddress];
        }
    }

    removeValidationRequest(walletAddress) {
        return this.mempool[walletAddress] = null;
    }

    validateRequestByWallet(walletAddress, signature) {
        if (this.mempool[walletAddress] != null) {
            let request = this.mempool[walletAddress];
            let isValid = bitcoinMessage.verify(request.message, walletAddress, signature);
            let validRequest = new ValidRequestClass.ValidRequest(request.walletAddress, request.requestTimeStamp, request.message, request.validationWindow, isValid);
            this.mempoolValid[request.walletAddress] = validRequest;
            return validRequest;
        } 
    }
}
module.exports.Mempool = Mempool;