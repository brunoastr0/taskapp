const { time } = require('console')
const mongoose = require('mongoose')
const schema = mongoose.Schema

const Task = new schema({
    seccao:{
        type:String,
        required: true
    },
    trabalho: {
        type:String,
        required: true
        
    },
    cliente: {
        type:String,
        required: true
    },
    data: {
        type: Date,
    },
    obs:{
        type:String
    }

})

mongoose.model('task',Task)