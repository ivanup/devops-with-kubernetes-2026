const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');

const id = randomUUID();
const filePath = path.join('/usr/src/app/files', 'log.txt');

const writeLog = () => {
    const logLine = `${new Date().toISOString()}: ${id}`;
    
    console.log(logLine.trim());

    try {
        fs.writeFileSync(filePath, logLine);
    } catch (err) {
        console.error('Error writing log file to shared volume:', err);
    }
};

writeLog();
setInterval(writeLog, 5000);