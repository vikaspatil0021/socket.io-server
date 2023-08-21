import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const mainServer = createServer(app);


const io = new Server(mainServer, {
    transports: ['websocket',  'polling'],
    cors:{
        origin:"*"
    }
});


let users = []
io.on("connection", (socket) => {

    socket.on('join room',(username)=>{
        socket.join("1");
        users.push(username);
        socket.username = username;

        io.emit('update users',users);
        socket.to("1").emit('new user',username);

    })
    

    socket.on("disconnect",()=>{
        users = [...users].filter(each=>{
            return each!==socket.username
        });
        io.emit('update users',users);
        if(socket.username){

            io.in("1").emit('user left',socket.username);
        }

    });
});



mainServer.listen(process.env.PORT | 5000, (req, res) => {
    console.log("server is listening on port 5000");
});


