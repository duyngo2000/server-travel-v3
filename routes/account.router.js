const express = require('express')
const ModelAccount = require('../models/account.model')
const authenToken = require('../middleware/authenToken')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.get('/', authenToken, (req, res) => {
    ModelAccount.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({ message: "Lỗi" })
        })
})
//thêm mới dữ liệu
router.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    ModelAccount.findOne({
        username: username
    })
        .then(data => {
            if (data) {
                res.status(200).json("Tên người dùng đã tồn tại")
            }
            else {
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    // Store hash in your password DB.
                    if (err) console.log(err)
                    ModelAccount.create({
                        username: username,
                        password: hash,
                    })
                });
                res.status(200).json("tạo tài khoản thành công")
            }
        })
        .catch(err => {
            res.status(500).json("tạo tài khoản thất bại")
        })
})

router.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    ModelAccount.findOne({
        username: username
    })
        .then(data => {
            bcrypt.compare(password, data.password, function (err, result) {
                // result == true
                if (result) {
                    const accessToken = jwt.sign({ user: data.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
                    const refreshToken = jwt.sign({ user: data.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '60s' })
                    ModelAccount.findOneAndUpdate({ username: username }, {
                        $push: { refreshToken: refreshToken }
                    })
                        .then(dataa => {
                            res.status(200).json({
                                message: "đăng nhập thành công",
                                accessToken: accessToken,
                                expiresInAccessToken: "30s",
                                refreshToken: refreshToken,
                                expiresRefreshToken: "60s",
                            })
                        })
                        .catch(erre => res.sendStatus(500))

                } else {
                    res.status(200).json("sai mật khẩu")
                }
            });
        })
        .catch(err => {
            res.status(500).json("lỗi gì đó")
        })
})

router.post('/refreshToken', (req, res) => {
    const refreshToken = req.body.token
    if (!refreshToken) res.sendStatus(401)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if (err) res.sendStatus(403)

        ModelAccount.findOne({ username: data.user })
            .then(user => {
                if (!(user.refreshToken).includes(refreshToken)) res.status(403).json({ message: "hi" })
                const accessToken = jwt.sign({ username: data.username }, process.env.ACCESS_TOKEN_SECRET)
                res.status(200).json({ accessToken })
            })
            .catch(err => {
                res.sendStatus(403)
            })
    })
})

router.post('/logout', (req, res) => {
    const refreshToken = req.body.token
    const username = req.body.username
    // xoá refreshToken
    ModelAccount.findOneAndUpdate({ username: username }, { '$pull': { "refreshToken": refreshToken } })
    res.sendStatus(200)
})
//update dữ liệu
router.put('/:id', (req, res) => {
    const id = req.params.id

    const NewName = req.body.userName
    const NewPassword = req.body.password
    const level = req.body.level

    ModelAccount.findByIdAndUpdate(id, {
        userName: NewName,
        password: NewPassword,
        level: level
    })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})

//xóa dữ liệu
router.delete('/:id', (req, res) => {
    const id = req.params.id

    ModelAccount.deleteOne({
        _id: id
    })
        .then(data => {
            res.json("Xóa thành công")
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})

module.exports = router