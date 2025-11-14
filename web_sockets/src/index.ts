import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import cors from 'cors';
import dotenv from 'dotenv';
import { parse } from 'url'; // <-- IMPORT THIS



// Load environment variables
dotenv.config();

// --- CUSTOM INTERFACE ---
// Define a WebSocket with our custom 'channel' property
interface CustomWebSocket extends WebSocket {
  channel: string;
}

const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server });

// --- WebSocket Connection Logic ---
// We now accept 'req' (the incoming request) to read the URL
wss.on('connection', (ws: CustomWebSocket, req: http.IncomingMessage) => {

  // --- 1. Get channel from URL ---
  const urlParams = parse(req.url || '', true); // Parse the URL
  const channel = (urlParams.query.channel as string) || 'general'; // Get ?channel=...

  // --- 2. "Tag" the client with its channel ---
  ws.channel = channel; // Attach the channel to the ws object

  console.log(`A new client connected to channel: ${channel}`);

  // Handle messages from the client
  ws.on('message', (message: string) => {
    console.log(`Received message on channel '${ws.channel}': ${message}`);

    // --- 3. Broadcast to the correct channel ---
    // Iterate over all clients
    wss.clients.forEach((client) => {
      // Cast the client to our custom type
      const customClient = client as CustomWebSocket;

      // Check if the client is in the same channel, is open, and is not the sender
      if (customClient.channel === ws.channel &&
        customClient.readyState === WebSocket.OPEN &&
        customClient !== ws) {
        customClient.send(message.toString());
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log(`Client disconnected from channel: ${ws.channel}`);
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// --- HTTP Routes ---
app.get('/', (req, res) => {
  res.send('Chat server is running!');
});

// --- HTTP Route to Send a Message ---
app.post('/send-message', (req, res) => {
  // --- 4. Get channel from request body ---
  const { message, channel } = req.body; // Expect {"message": "...", "channel": "..."}

  if (!message || !channel) {
    return res.status(400).send({ error: 'Message and channel are required' });
  }

  console.log(`Received message via HTTP POST for channel '${channel}': ${message}`);

  // Broadcast the message to ALL clients in the specified channel
  wss.clients.forEach((client) => {
    const customClient = client as CustomWebSocket;

    if (customClient.channel === channel &&
      customClient.readyState === WebSocket.OPEN) {
      customClient.send(message.toString());
    }
  });

  res.status(200).send({ status: 'Message broadcasted' });
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
