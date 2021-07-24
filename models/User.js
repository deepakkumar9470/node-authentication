const mongoose = require('mongoose')
const {isEmail} = require('validator')

const UserSchema = new mongoose.Schema({
    name  : {
        type: String,
        required: true
    },
    email  : {
        type: String,
        required: [true, 'Please enter email'],
        unique :true,
        lowercase : true,
        validate : [isEmail , 'Please enter a valid email']
    },
    password  : {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [8, 'Minimum password length must be 8 characters']
    },
    createdAt  : {
        type: Date,
        default  : Date.now
    },
})

module.exports = mongoose.model('User', UserSchema)