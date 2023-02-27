const mongoose = require('mongoose');

const userAuthSchema = new mongoose.Schema({
    email: { type: String, required: true , unique:true},
    password: { type: String, required: true },
    name: { type: String, required: true }
},{
    timestamps:true
})

module.exports.userAuthSchema;