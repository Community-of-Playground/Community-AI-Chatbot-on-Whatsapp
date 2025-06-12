import { runPingPong, runMorningCommand, runTimeCommand, runAuthorCommand } from "./commands/index.ts";
import { apiKey, session, websocket, chatId } from "./config/env.ts";
import { MentionAll } from "./commands/function/mention-all.ts";

const events = ['session.status', 'message'];

const queryParams = new URLSearchParams({
    'x-api-key': apiKey,
    session,
    ...events.reduce((acc, event) => ({ ...acc, events: event }), {}) // Add multiple 'events' params
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

const specificFrom = chatId;

const commandHandlers: Record<string, () => Promise<void>> = {
  "/ping": runPingPong,
  "/morning": runMorningCommand,
  "/time": runTimeCommand,
  "/author": runAuthorCommand,
  "/everyone": MentionAll,
};

// Handle incoming messages
socket.onmessage = async (event) => {
    try {
        const data = JSON.parse(event.data);

        if (data.payload && data.payload.from === specificFrom) {
            const commandHandler = commandHandlers[data.payload.body];
            if (commandHandler) {
                console.log(`Triggering command: ${data.payload.body}`);
                await commandHandler();
            } else {
                console.log(`No handler for command: ${data.payload.body}`);
            }
        }
    } catch (err) {
        console.error('Error parsing message:', err);
    }
};
