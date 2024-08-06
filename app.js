// app.js
document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const chatContainer = document.getElementById('chat-container');
    const loginUsername = document.getElementById('login-username');
    const loginButton = document.getElementById('login-button');
    const chatWindow = document.getElementById('chat-window');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    let username = '';
    const socket = new WebSocket('ws://localhost:8080');

    loginButton.addEventListener('click', () => {
        username = loginUsername.value.trim();
        if (username) {
            loginContainer.style.display = 'none';
            chatContainer.style.display = 'flex';
            appendMessage('System', 'You joined the chat as ' + username);
        }
    });

    sendButton.addEventListener('click', () => {
        const message = messageInput.value;
        if (message.trim() !== '' && username) {
            const timestamp = new Date().toLocaleTimeString();
            const fullMessage = `${timestamp} - ${username}: ${message}`;
            appendMessage('You', fullMessage);
            socket.send(JSON.stringify({ username, message, timestamp }));
            messageInput.value = '';
        }
    });

    socket.addEventListener('message', event => {
        const data = JSON.parse(event.data);
        appendMessage(data.username, `${data.timestamp} - ${data.message}`);
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});
