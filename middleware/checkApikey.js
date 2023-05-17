
function checkApikey(req, res, next) {
    const authorizationHeader = req.headers['api-key']

    if (!authorizationHeader) {
        res.status(401).json({ message: "Lỗi authorizationHeader" })
    }
    else {
        if (authorizationHeader == 'duy') {
            next()
        }
        else {
            res.status(401).json({ message: "Lỗi token" })
        }
    }
}

module.exports = checkApikey