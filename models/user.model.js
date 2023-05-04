const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    Username:String,
    Email:String,
    Password:String,
    verified:{type:Boolean,default:false}
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}