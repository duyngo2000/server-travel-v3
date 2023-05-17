const mongoose = require('mongoose')

const { Schema } = mongoose;

const infoUserSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    age: Number,
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    phone: Number,
    address: String,
},
    { timestamps: true },
    {
        collection: 'infoUser'
    });


module.exports = mongoose.model('infoUser', infoUserSchema); 
