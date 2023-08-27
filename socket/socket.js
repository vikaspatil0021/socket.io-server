import { Server } from "socket.io";

import { ChatInfo } from "../mongodb/modals/modals.js";

const socketConnection = (mainServer) => {


    const io = new Server(mainServer, {
        transports: ['websocket', 'polling'],
        cors: {
            origin: "*"
        }
    });

    let users = []
    io.on("connection", (socket) => {

        socket.on('join room',async (username) => {
            console.log(username + ' and ' + socket.id)
            socket.join("room1");
            users.push(username);
            socket.username = username;


            io.emit('update users', users);
            socket.to("room1").emit('new user', username);

            const results = await ChatInfo.find();
            socket.emit('get chats', results);

        });

        socket.on("user message", async (data) => {
            console.log(data.userName + ' for new msg ' + socket.id)
            await ChatInfo.create({
                msg: data.msg,
                username: data.userName
            });
            io.in("room1").emit('newMessage', data);
 
        })


        socket.on("disconnect", () => {
            users = [...users].filter(each => {
                return each !== socket.username
            });
            io.emit('update users', users);
            if (socket.username) {

                socket.to("room1").emit('user left', socket.username);
            }

        });
    });
}

export default socketConnection;