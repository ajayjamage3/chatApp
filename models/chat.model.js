const mongoose = require("mongoose")
const Schema = mongoose.Schema
const {UserModel} = require("./user.model")

const chatSchema = mongoose.Schema({
    recipient:{ type: Schema.Types.ObjectId, ref: UserModel },
    message:String,
    sender:{ type: Schema.Types.ObjectId, ref: UserModel },
    timestamp:Date
})

const ChatModel = mongoose.model("chat",chatSchema)

module.exports = {
    ChatModel
}
