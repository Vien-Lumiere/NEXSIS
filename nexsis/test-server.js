const http = require('http');
const WebSocket = require('ws');

const PORT = 5000;

// In-memory earthquake history
const earthquakeHistory = [
  {
    id: 1234567800,
    status: 'earthquake_detected',
    sensor: 'SW420-A1',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    receivedAt: formatDate(new Date(Date.now() - 3600000)),
  },
  {
    id: 1234567801,
    status: 'earthquake_detected',
    sensor: 'SW420-B2',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    receivedAt: formatDate(new Date(Date.now() - 7200000)),
  },
  {
    id: 1234567802,
    status: 'earthquake_detected',
    sensor: 'SW420-A1',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    receivedAt: formatDate(new Date(Date.now() - 86400000)),
  }
];

function formatDate(date) {
  const pad = (num) => String(num).padStart(2, '0');
  const d = pad(date.getDate());
  const m = pad(date.getMonth() + 1);
  const y = date.getFullYear();
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  return `${d}/${m}/${y} ${h}:${min}:${s}`;
}

// Create HTTP Server
const server = http.createServer((req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/history' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(earthquakeHistory));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

// Create WebSocket Server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket.');

  ws.on('close', () => {
    console.log('Client disconnected.');
  });
});

// Function to broadcast earthquake to all connected clients
function broadcastEarthquake() {
  const newEvent = {
    id: Date.now(),
    status: 'earthquake_detected',
    sensor: 'SW420-' + ['SYS-A', 'SYS-B', 'SW420-A1', 'SW420-B2'][Math.floor(Math.random() * 4)],
    timestamp: new Date().toISOString(),
    receivedAt: formatDate(new Date()),
  };

  // Add to history (at the beginning)
  earthquakeHistory.unshift(newEvent);
  if (earthquakeHistory.length > 10) {
    earthquakeHistory.pop();
  }

  const payload = JSON.stringify({
    type: 'earthquake',
    data: newEvent,
  });

  console.log(`\n[BROADCASTING EARTHQUAKE]: Sensor ${newEvent.sensor} at ${newEvent.receivedAt}`);
  
  let clientsCount = 0;
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
      clientsCount++;
    }
  });
  console.log(`Broadcasted to ${clientsCount} client(s).`);
}

// Start Server
server.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`NEXSIS Mock Server is running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}`);
  console.log(`WS URL:  ws://localhost:${PORT}`);
  console.log(`=================================================`);
  console.log(`Commands:`);
  console.log(`- Press [ENTER] key in this terminal to simulate and broadcast a new earthquake alert.`);
  console.log(`=================================================`);
});

// Listen to keypresses on stdin to simulate alerts
process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
  if (data.trim() === '') {
    broadcastEarthquake();
  }
});

// Optional periodic auto-broadcast every 30 seconds
const interval = setInterval(() => {
  // broadcastEarthquake();
}, 30000);

process.on('SIGINT', () => {
  clearInterval(interval);
  process.exit();
});
