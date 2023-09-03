import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
});

const roomsSchema = mongoose.Schema({
    users: []
});

const chatSchema = mongoose.Schema({
    msg: String,
    userId: String,
    roomId: String
});


const ChatInfo = mongoose.model("message", chatSchema);
const UserInfo = mongoose.model("user", userSchema);
const RoomsInfo = mongoose.model("room", roomsSchema);


export {
    ChatInfo, 
    UserInfo,
    RoomsInfo
}