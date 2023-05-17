const express = require('express')
const ModelTourUser = require('../models/tourUser.model')
const router = express.Router()


const getTotalPage = async () => {
    return await ModelTourUser.find({}).count();
}
router.get('/', (req, res) => {
    const { _id } = req.query

    ModelTourUser.find({ _id: _id })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})

router.put('/put', (req, res) => {
    const { id } = req.query
    const _id = req.body._id
    const name = req.body.name
    const code = req.body.code
    const price = req.body.price
    const timeStart = req.body.timeStart
    const timeEnd = req.body.timeEnd
    const method = req.body.method
    const status = req.body.status
    ModelTourUser.findByIdAndUpdate(id, {
        $push: {
            allTour: {
                _id: _id,
                name: name,
                code: code,
                price: price,
                timeStart: timeStart,
                timeEnd: timeEnd,
                pay: {
                    method: method,
                    status: status
                }
            }
        }
    })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({
                message: "Thêm thất bại",
                err: err
            })
            console.log(err)
        })
})


module.exports = router