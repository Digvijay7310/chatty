export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected", socket.id);

        // Simple message system
        socket.on('sendMessafe', (data) => {
            console.log("Message received: ", data)

            // Broadcast to all clients
            io.emit("receiveMessage", data);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected: ", socket.id);
        })
    })
}