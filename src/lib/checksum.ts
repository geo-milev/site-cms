import crypto from "crypto";

const checksum = (text) => {
    return crypto.createHash('md5').update(text).digest("hex");
}

export {checksum}
