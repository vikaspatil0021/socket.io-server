import express from "express";
import { createServer } from "http";
import mongoConnection  from "./mongodb/mongodb.js";
import socketConnection from "./socket/socket.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const mainServer = createServer(app);


// socket io connection
socketConnection(mainServer);

// mongodb connection
mongoConnection();






mainServer.listen(process.env.PORT | 5000, (req, res) => {
    console.log("server is listening on port 5000");
});


