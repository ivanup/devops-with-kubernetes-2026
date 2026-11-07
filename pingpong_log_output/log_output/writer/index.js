const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');

const id = randomUUID();
const filePath = path.join('/usr/src/app/files', 'log.txt');

const writeLog = () => {
    const logLine = `${new Date().toISOString()}: ${id}\n`;
    console.log(logLine.trim());
    // Escribe el log actual sobre el archivo compartido
    fs.writeFileSync(filePath, logLine);
};

writeLog();
setInterval(writeLog, 5000);