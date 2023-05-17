const jwt = require('jsonwebtoken');
/**
 * 1. kiểm tra client có gởi req.headers['authorization']
 * 2. nếu tồn tại thì lấy ra token
 * 3. check token có hợp lệ hay k
 */
function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization']
    if (!authorizationHeader) {
        res.status(401).json({ message: "Lỗi authorizationHeader" })
    }
    //Beaer[token]
    const token = authorizationHeader.split(" ")[1]
    if (!token) {
        res.status(401).json({ message: "Lỗi token" })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            res.status(403).json({ message: "Lỗi verify" })
        }
        else {
            next()
        }
    })
}

module.exports = authenToken