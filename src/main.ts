import { commandHandlers } from "./commands/index.ts";
import { apiKey, session, websocket, chatIds } from "./config/env.ts";
// import { MentionAll } from "./commands/function/mention-all.ts";
import { sendTextMessage } from "./commands/function/send-text.ts";

const events = ['session.status',
    'message',
    'group.v2.participants'
];

// Create query parameters
const queryParams = new URLSearchParams();
queryParams.set('x-api-key', apiKey!);
queryParams.set('session', session!);

// Add multiple events parameters
events.forEach(event => {
    queryParams.append('events', event);
});

const wsUrl = `${websocket}?${queryParams.toString()}`;

// Initialize WebSocket connection
const socket = new WebSocket(wsUrl);

// Handle incoming messages
socket.onmessage = (event) => {
    console.log('Received:', event.data);
};

// Handle errors
socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
};

// Handle connection open
socket.onopen = () => {
    console.log('WebSocket connection established:', wsUrl);
};

// Handle connection close
socket.onclose = (event) => {
    console.log('WebSocket connection closed');
    console.log('Close event details:', {
        wasClean: event.wasClean,
        code: event.code,
        reason: event.reason,
    });
};


// Handle incoming messages
socket.onmessage = async (event) => {
    try {
        const data = JSON.parse(event.data);
        console.log(event.data); // log all event

        if (data.event === 'message') {
            console.log('Handling message event:', data.payload); // log all message
            if (data.payload) {
                // Check if the message is from allowed chat IDs
                if (chatIds.includes(data.payload.from)) {
                    console.log('Message from allowed chat ID:', data.payload.from);
                    console.log('Message payload:', data.payload);
                    
                    // Extract variables from payload
                    const chatId = data.payload.from;
                    const replyTo = data.payload.id;
                    const messageBody = data.payload.body;
                    
                    // Check if message body is a command
                    if (messageBody && messageBody.startsWith('/')) {
                        const commandHandler = commandHandlers[messageBody];
                        if (commandHandler) {
                            console.log(`Triggering command: ${messageBody}`);
                            await commandHandler(chatId, replyTo);
                        } else {
                            console.log(`No handler for command: ${messageBody}`);
                            // Send response for unknown command
                            await sendTextMessage(
                                `Command "${messageBody}" tidak dikenali. Ketik /help untuk melihat daftar command yang tersedia.`,
                                chatId,
                                replyTo
                            );
                        }
                    }
                } else {
                    console.log('Message from unauthorized chat ID:', data.payload.from);
                }
            } else {
                console.warn('Message event received without payload');
            }
            return;
        }

        if (data.event === 'group.v2.participants') {
            console.log('Handling group.v2.participants event:', data.payload);
            // Add your logic here to handle the group.v2.participants event
            return;
        }
    } catch (err) {
        console.error('Error parsing message:', err);
    }
};
