import { v4 as uuidv4 } from 'uuid';
import { calculateElapsedSeconds } from './helpers/calculateElapsedSeconds.js';

// These are global to all connections (server-wide)
const roomsJoined = new Set();
const roomTimers = new Map();

export function estConnection(socket, io) {

    socket.on('createRoom', () => {
        const roomId = uuidv4();
        socket.join(roomId);
        roomTimers.set(roomId, Date.now());
        socket.emit('roomCreated', roomId);
      });

    // Handle client joining room
    socket.on('joinRoom', async (roomId) => {

        // Connection validation; limit 2 players
        const clients = await io.in(roomId).allSockets();
        const numClients = clients.size;

        if (numClients >= 2) {
            // Room full, reject joining
            socket.emit('roomFull', `Room ${roomId} is full. Cannot join.`);
            return;
        }

        // Else allow join
        socket.join(roomId);
        roomsJoined.add(roomId);
      
        // Get updated player count
        const clientsAfter = await io.in(roomId).allSockets();
        const numClientsAfter = clientsAfter.size;

        // Notify others
        const timestamp = calculateElapsedSeconds(roomTimers.get(roomId) || Date.now());
        socket.to(roomId).emit('playerJoined', {msg: 'A challenger approaches!...', timestamp});
        io.in(roomId).emit('playerCtUpdate', numClientsAfter);

        // When a player makes a move
        socket.on('gameMove', ({roomId, move}) => {
            const timestamp = calculateElapsedSeconds(roomTimers.get(roomId) || Date.now());
            io.in(roomId).emit('gameMove', {
                move,
                timestamp,
                senderId: socket.id,  // include sender socket id
              });
        });
    })

    // Handle disconnect
    socket.on('disconnect', (roomId) => {
        roomsJoined.forEach(async(roomId) => {
            const timestamp = calculateElapsedSeconds(roomTimers.get(roomId) || Date.now());
            socket.to(roomId).emit('playerLeft', {msg: 'Your opponent fled!', timestamp});
            const clients = await io.in(roomId).allSockets();
        const numClients = clients.size;
            io.in(roomId).emit('playerCtUpdate', numClients);

        })
    })
}