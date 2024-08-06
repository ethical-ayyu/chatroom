// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    ws.on('message', message => {
        // Parse the incoming message
        const data = JSON.parse(message);
        const { username, message: userMessage, timestamp } = data;

        // Broadcast the received message to all clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ username, message: userMessage, timestamp }));
            }
        });
    });
    ws.send(JSON.stringify({ username: 'System', message: 'Welcome to the chat!', timestamp: new Date().toLocaleTimeString() }));
});
