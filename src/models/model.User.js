const { Schema, model } = require('mongoose')

const Users = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },

    phone: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

const User = model('User', Users)

module.exports = User