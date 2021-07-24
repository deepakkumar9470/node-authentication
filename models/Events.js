const mongoose = require('mongoose')


const EventSchema = new mongoose.Schema({
    title  : {
        type: String,
        required: true
    },
    isCompleted : {
        type : Boolean
    }
}, {timestamps : true});

module.exports = mongoose.model('Event', EventSchema)