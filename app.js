// app.js

document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const chatContainer = document.getElementById('chat-container');
    const loginButton = document.getElementById('login-button');
    const sendButton = document.getElementById('send-button');
    const loginUsername = document.getElementById('login-username');
    const messageInput = document.getElementById('message-input');
    const chatWindow = document.getElementById('chat-window');

    let username = null;
    let socket = new WebSocket('ws://localhost:8080');

    loginButton.addEventListener('click', () => {
        username = loginUsername.value.trim();
        if (username) {
            loginContainer.style.display = 'none';
            chatContainer.style.display = 'flex';
            socket.send(JSON.stringify({ username, message: 'has joined the chat.', timestamp: new Date().toLocaleTimeString() }));
        }
    });

    sendButton.addEventListener('click', () => {
        const userMessage = messageInput.value.trim();
        if (userMessage) {
            socket.send(JSON.stringify({ username, message: userMessage, timestamp: new Date().toLocaleTimeString() }));
            messageInput.value = '';
        }
    });

    socket.addEventListener('message', event => {
        const { username, message, timestamp } = JSON.parse(event.data);
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = `${timestamp} ${username}: ${message}`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    });

    messageInput.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });
});
