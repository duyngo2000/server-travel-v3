const router = require('express').Router()

router.post('/register', (req, res) => {

})
function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization']
    // 'Beaer [token]'
    const token = authorizationHeader.split(' ')[1]
    if (!token) res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) res.sendStatus(403)
        next()
    })
}
module.exports = router