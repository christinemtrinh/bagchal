export function estConnection(socket) {

    // Handle client joining room
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);

        // Notify others
        socket.to(roomId).emit('playerJoined', `Player joined room ${roomId}`);

        // When a player makes a move
        socket.on('gameMove', ({roomId, move}) => {
            socket.to(roomId).emit('gameMove', move);
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        })
    })
}