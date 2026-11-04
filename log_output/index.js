const { randomUUID } = require('crypto');
const http = require('http');

const id = randomUUID();

const log = () => console.log(`${new Date().toISOString()}: ${id}`);

log();
setInterval(log, 5000);

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${new Date().toISOString()}: ${id}\n`);
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Web server running at http://localhost:${PORT}`);
});