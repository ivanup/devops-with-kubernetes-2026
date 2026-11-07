const http = require('http');
const fs = require('fs');
const path = require('path');

const filePath = path.join('/usr/src/app/files', 'log.txt');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    
    try {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            res.end(`App Status from Shared File:\n${content}`);
        } else {
            res.end('Waiting for logs...\n');
        }
    } catch (err) {
        res.end('Error reading log file\n');
    }
});

server.listen(PORT, () => {
    console.log(`Reader server running on port ${PORT}`);
});