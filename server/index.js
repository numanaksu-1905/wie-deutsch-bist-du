
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.get("/", (req,res)=>res.send("Quiz Multiplayer Server läuft ✅"));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET","POST"] } });

const rooms = new Map();
function emitPlayers(room){ io.to(room).emit("updatePlayers", rooms.get(room) || {}); }

io.on("connection", (socket)=>{
  socket.on("joinRoom", ({room, playerName})=>{
    if(!room || !playerName) return;
    socket.join(room);
    const state = rooms.get(room) || {};
    if(!state[playerName]) state[playerName] = 0;
    rooms.set(room, state);
    emitPlayers(room);
  });
  socket.on("sendScore", ({room, playerName, score})=>{
    if(!room || !playerName) return;
    const state = rooms.get(room) || {};
    state[playerName] = score || 0;
    rooms.set(room, state);
    emitPlayers(room);
  });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, ()=>console.log("✅ Server läuft auf Port", PORT));
