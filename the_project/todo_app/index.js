const http = require('http');
const fs = http.require ? require('fs') : require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const imagePath = path.join('/usr/src/app/files', 'image.jpg');
const statePath = path.join('/usr/src/app/files', 'state.json');

const fetchNewImage = async () => {
    try {
        const response = await fetch('https://picsum.photos/1200');
        const arrayBuffer = await response.arrayBuffer();
        fs.writeFileSync(imagePath, Buffer.from(arrayBuffer));
        
        fs.writeFileSync(statePath, JSON.stringify({ servedOldOnce: false }));
        console.log('New image downloaded and cached in persistent volume.');
    } catch (err) {
        console.error('Error fetching image from Picsum:', err);
    }
};

const ensureImageIsFresh = async () => {
    const tenMinutesInMs = 10 * 60 * 1000;

    if (!fs.existsSync(imagePath) || !fs.existsSync(statePath)) {
        await fetchNewImage();
        return;
    }

    const stats = fs.statSync(imagePath);
    const fileAge = Date.now() - new Date(stats.mtime).getTime();

    if (fileAge > tenMinutesInMs) {
        let state = { servedOldOnce: false };
        try {
            state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
        } catch (e) {
        }

        if (!state.servedOldOnce) {
            state.servedOldOnce = true;
            fs.writeFileSync(statePath, JSON.stringify(state));
            console.log('10 minutes passed: serving the old image one last time.');
        } else {
            console.log('10 minutes passed and old image was served once: fetching new image.');
            await fetchNewImage();
        }
    }
};

const server = http.createServer(async (req, res) => {
    await ensureImageIsFresh();

    if (req.url === '/image.jpg') {
        if (fs.existsSync(imagePath)) {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            fs.createReadStream(imagePath).pipe(res);
            return;
        }
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Todo App</title>
        </head>
        <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 40px; background-color: #f9f9f9;">
            <h1 style="font-size: 2.5em; color: #333;">Todo App</h1>
            <div style="margin: 20px auto;">
                <img src="/image.jpg" alt="Random Picsum Image" style="max-width: 600px; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
            </div>
            <p style="font-size: 0.9em; color: #888; margin-top: 20px;">DevOps with Kubernetes 2026</p>
        </body>
        </html>
    `);
});

server.listen(port, () => {
    console.log(`Server started in port ${port}`);
});