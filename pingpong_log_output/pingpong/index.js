const http = require('http');
const fs = require('fs');
const path = require('path');

const filePath = path.join('/usr/src/app/files', 'pingpong.txt');
let counter = 0;

try {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8').trim();
        counter = parseInt(data, 10) || 0;
    }
} catch (err) {
    console.error('Error reading persistent counter:', err);
}

const server = http.createServer((req, res) => {
    if (req.url === '/pingpong') {
        counter++;
        
        try {
            fs.writeFileSync(filePath, counter.toString());
        } catch (err) {
            console.error('Error writing to shared volume:', err);
        }

        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`pong ${counter}\n`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not Found\n');
    }
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Ping-pong server running at http://localhost:${PORT}`);
});