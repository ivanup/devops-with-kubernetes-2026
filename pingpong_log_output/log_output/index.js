const { randomUUID } = require('crypto');
const http = require('http');

const id = randomUUID();
const port = process.env.PORT || 3000;

const PING_PONG_URL = process.env.PING_PONG_URL || 'http://pingpong-svc:2345/pings';

let currentTimestamp = new Date().toISOString();

const log = () => {
    currentTimestamp = new Date().toISOString();
    console.log(`${currentTimestamp}: ${id}`);
};

log();
setInterval(log, 5000);

const getPingCount = async () => {
    try {
        const response = await fetch(PING_PONG_URL);
        const data = await response.json();
        return typeof data === 'object' ? data.count : data;
    } catch (err) {
        console.error('Error fetching pings from ping-pong service:', err);
        return 0;
    }
};

const server = http.createServer(async (req, res) => {
    const pings = await getPingCount();
    
    const responseText = `${currentTimestamp}: ${id}.\nPing / Pongs: ${pings}\n`;

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(responseText);
});

server.listen(port, () => {
    console.log(`Web server running at http://localhost:${port}`);
});