const mongoose = require('mongoose')

const { Schema } = mongoose;

const tourUserSchema = new Schema({
    allTour: [
        {
            _id: {
                type: String,
                require: true
            },
            name: {
                type: String,
                require: true
            },
            code: {
                type: String,
                require: true
            },
            price: {
                type: Number,
                require: true
            },
            timeStart: {
                type: Date,
                require: true
            },
            timeEnd: {
                type: Date,
                require: true
            },
            pay: {
                method: String, // thanh toán bằng tiền mặt, bằng chuyển khoản ngân hàng
                status: String, // đã thanh toán, chưa thanh toán, trả trước 20%
            }
        }
    ],
},
    { timestamps: true },
    {
        collection: 'tourUser'
    });


module.exports = mongoose.model('tourUser', tourUserSchema); 
