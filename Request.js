/* ===== Request Class ==============================
|  Class with a constructor for request			   |
|  ===============================================*/

class Request{
	constructor(address){
		this.walletAddress = address,
		this.requestTimeStamp = 0,
		this.message = "",
		this.validationWindow = 0
	}
}
module.exports.Request = Request;