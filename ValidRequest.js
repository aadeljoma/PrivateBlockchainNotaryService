/* ===== ValidRequest Class ==============================
|  Class with a constructor for valid request			   |
|  ===============================================*/

class ValidRequest {
    constructor(walletAddress, requestTimeStamp, message, validationWindow, valid) {
        this.registerStar = true;
        this.status = {
            address: walletAddress,
            requestTimeStamp: requestTimeStamp,
            message: message,
            validationWindow: validationWindow,
            messageSignature: valid
        };
    }
}
module.exports.ValidRequest = ValidRequest;