export function estConnection(socket) {

    const roomsJoined = new Set();
    // Handle client joining room
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        roomsJoined.add(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
      
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