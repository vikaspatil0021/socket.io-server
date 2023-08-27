import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    fullName:String
});

const roomsSchema = mongoose.Schema({
    users: []
});

const chatSchema = mongoose.Schema({
    msg: String,
    username: String
});


const ChatInfo = mongoose.model("message", chatSchema);
const UserInfo = mongoose.model("user", userSchema);
const RoomsInfo = mongoose.model("user", roomsSchema);


export {
    ChatInfo,
    UserInfo,
    RoomsInfo
}