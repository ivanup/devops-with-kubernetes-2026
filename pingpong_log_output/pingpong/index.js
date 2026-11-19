const http = require('http');

let counter = 0;

const server = http.createServer((req, res) => {
    if (req.url === '/pingpong') {
        counter++;
        
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`pong ${counter}\n`);
    } 
    else if (req.url === '/pings') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ count: counter }));
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not Found\n');
    }
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Ping-pong server running at http://localhost:${PORT}`);
});