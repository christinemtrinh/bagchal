const express = require("express");
const http = require('http');
const socketIO = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 8080;

const api = require('./api'); 
const sockImpl = require('./socket')

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json()); 

// Endpoint for maintaining client connection
app.get("/create-room", (req, res) => {
  const roomId = uuidv4();
  res.send({roomId});
});
io.on('connection', (socket) => socketImpl.estConnection(socket));

// Endpoints for handling game state
app.post("/api/prepareGoatMovePhaseOne", (req, res) => api.getGoatLegalMovesPhaseOne((req.body), res));
app.post("/api/selectGoat", (req, res) => api.findGoat((req.body), res));
app.post("/api/selectTiger", (req, res) => api.findTiger((req.body), res));
app.post("/api/getTigerLegalMoves", (req, res) => api.getTigerLegalMoves((req.body), res));

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
