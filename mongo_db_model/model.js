const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userModel = {
    username: String,
    password: String,
    age: Number,
    avatar: String
}

const UserModel = mongoose.model("user", new Schema(userModel));

module.exports = UserModel