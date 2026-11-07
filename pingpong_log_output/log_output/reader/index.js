const http = require('http');
const fs = require('fs');
const path = require('path');

const logFilePath = path.join('/usr/src/app/files', 'log.txt');
const pingPongFilePath = path.join('/usr/src/app/files', 'pingpong.txt');

const server = http.createServer((req, res) => {
    let logContent = '';
    try {
        if (fs.existsSync(logFilePath)) {
            logContent = fs.readFileSync(logFilePath, 'utf8').trim();
        }
    } catch (err) {
        logContent = 'Waiting for logs...';
    }

    let pings = 0;
    try {
        if (fs.existsSync(pingPongFilePath)) {
            pings = parseInt(fs.readFileSync(pingPongFilePath, 'utf8').trim(), 10) || 0;
        }
    } catch (err) {
        pings = 0;
    }

    const responseText = `${logContent}.Ping / Pongs: ${pings}\n`;

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(responseText);
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Log-reader server running at http://localhost:${PORT}`);
});