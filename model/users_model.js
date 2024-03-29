const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model('User', user_schema);
module.exports = UserModel;