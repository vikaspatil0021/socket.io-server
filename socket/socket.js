import { Server } from "socket.io";

import { ChatInfo, RoomsInfo, UserInfo } from "../mongodb/modals/modals.js";

const socketConnection = (mainServer) => {


    const io = new Server(mainServer, {
        transports: ['websocket', 'polling'],
        cors: {
            origin: "*"
        }
    });

    let users = []
    io.on("connection", (socket) => {
        socket.on("userAuth", async ({ username }) => {
            const existUser = await UserInfo.findOne({ username });
            if (!existUser) {
                var newUser = await UserInfo.create({
                    username
                });
            }
            socket.emit("userAuth", (existUser) ? existUser._id : newUser._id)
        });


        socket.on("create room", async ({ otherUsername, userId0 }) => {
            const existUser = await UserInfo.findOne({ username: otherUsername });
            const existRoom = await RoomsInfo.findOne({ users: { $all: [(existUser._id).toHexString(), userId0] } });

            if (existRoom) {
                socket.join((existRoom._id).toHexString());
                socket.emit("Room detail", existRoom);

            } else {

                var newRoom = await RoomsInfo.create({
                    users: [(existUser._id).toHexString(), userId0]
                });
                socket.join((newRoom._id).toHexString());

                socket.emit("Room detail", newRoom);
            }
        });

        socket.on("new message", async ({ userId0, msg, activeRoom }) => {
            const message = await ChatInfo.create({
                msg,
                userId: userId0,
                roomId: activeRoom
            });
            console.log(message)
            io.in(activeRoom).emit("newMessage",message);
        })


    });
}

export default socketConnection;