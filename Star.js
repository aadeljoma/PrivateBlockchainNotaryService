/* ===== Star Class ==============================
|  Class with a constructor for star			   |
|  ===============================================*/
const hex2ascii = require('hex2ascii');


class Star {
    constructor(address, dec, ra, story) {
        this.address = address;
        this.star = {
            dec: dec,
            ra: ra,
            story: Buffer(story).toString('hex'),
            storyDecoded: hex2ascii(Buffer(story).toString('hex'))
        };
    }
}
module.exports.Star = Star;