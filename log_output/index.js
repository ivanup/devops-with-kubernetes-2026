const { randomUUID } = require('crypto');

const id = randomUUID();

const log = () => console.log(`${new Date().toISOString()}: ${id}`);

log();
setInterval(log, 5000);