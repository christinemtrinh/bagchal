const express = require("express");
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 8080;

const api = require('./api'); 
const socketImpl = require('./socket')

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",   // allow only your React app
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(express.json()); 

// Endpoint for maintaining client connection
app.get("/create-room", (req, res) => {
  const roomId = uuidv4();
  res.set({
    'Access-Control-Allow-Origin': '*'
  })
  res.send({roomId});
});

io.on('connection', (socket) => {          
  socketImpl.estConnection(socket, io);
});

// Endpoints for handling game state
app.post("/api/prepareGoatMovePhaseOne", (req, res) => api.getGoatLegalMovesPhaseOne((req.body), res));
app.post("/api/selectGoat", (req, res) => api.findGoat((req.body), res));
app.post("/api/selectTiger", (req, res) => api.findTiger((req.body), res));
app.post("/api/getTigerLegalMoves", (req, res) => api.getTigerLegalMoves((req.body), res));

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
