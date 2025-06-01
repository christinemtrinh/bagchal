export function estConnection(socket, io) {

    const roomsJoined = new Set();
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
      
        // Notify others
        socket.to(roomId).emit('playerJoined', `Player joined room ${roomId}`);
    
        // When a player makes a move
        socket.on('gameMove', ({roomId, move}) => {
            socket.to(roomId).emit('gameMove', move);
        });
    })

    // Handle disconnect
    socket.on('disconnect', (roomId) => {
        console.log("Running disconnect logic");
        roomsJoined.forEach((roomId) => {
            socket.to(roomId).emit('playerLeft', `Player has left the room`);
        })
    })
}