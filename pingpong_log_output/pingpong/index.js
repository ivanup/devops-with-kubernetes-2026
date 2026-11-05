const http = require('http');

let counter = 0;

const server = http.createServer((req, res) => {
    if (req.url === '/pingpong') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`pong ${counter}\n`);
        counter++;
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not Found\n');
    }
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Ping-pong server running at http://localhost:${PORT}`);
});