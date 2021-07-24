const mongoose = require('mongoose')
const {isEmail} = require('validator')

const OTPSchema = new mongoose.Schema({
    email  : {
        type: String,
        required: [true, 'Please enter email'],
        unique :true,
        lowercase : true,
        validate : [isEmail , 'Please enter a valid email']
    },
    code  : {
        type: String,
        required: true
    },
    expireIn  : {
        type: Number,

    },
})

module.exports = mongoose.model('Otp', OTPSchema,'otp')