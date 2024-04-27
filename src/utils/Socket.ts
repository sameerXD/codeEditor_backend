// socketService.ts

import { Socket, Server as SocketIOServer, ServerOptions } from "socket.io";
import { Server as HTTPServer } from "http"; // Import the Server class from the 'http' module
import { markdownToHtml } from "./Mark";

let io: SocketIOServer;
let socketObj: Socket;

export const online_Socket: any[] = [];

export const initSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    // Your Socket.IO options here
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket: Socket) => {
    socketObj = socket;

    console.log("A user connected", socket.id);

    // Get the list of connected socket IDs
    online_Socket.push(socket.id);

    // Handle socket events here
    socket.on("code", async (data) => {
      console.log("coding", data);
      const html = markdownToHtml(data);
      console.log("emitting to ", socket.id, html);
      
      io.to(socket.id).emit("preview", html)
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    
  });
};

export const getSocket = () => {
  if (!socketObj) {
    throw new Error("Socket.IO not initialized");
  }
  return socketObj;
};

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
};
