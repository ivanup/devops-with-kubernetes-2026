const http = require('http');
const fs = require('fs');
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
        } catch (e) {}

        if (!state.servedOldOnce) {
            state.servedOldOnce = true;
            fs.writeFileSync(statePath, JSON.stringify(state));
        } else {
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

    const hardcodedTodos = [
        "Learn Kubernetes basics",
        "Deploy application to cluster",
        "Configure persistent volumes"
    ];

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Todo App</title>
        </head>
        <body style="font-family: Arial, sans-serif; text-align: center; margin: 40px; background-color: #f9f9f9;">
            <h1 style="font-size: 2.5em; color: #222;">Todo App</h1>
            
            <div style="margin: 20px auto;">
                <img src="/image.jpg" alt="Random Picsum Image" style="max-width: 500px; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
            </div>

            <!-- Formulario con input de max 140 caracteres y botón Send -->
            <div style="margin: 30px auto;">
                <input type="text" placeholder="Enter a new todo (max 140 characters)" maxlength="140" style="width: 400px; padding: 10px; font-size: 1em; border: 2px solid #5cb85c; border-radius: 4px; outline: none;" />
                <button style="padding: 10px 20px; font-size: 1em; background-color: #5cb85c; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">Send</button>
            </div>

            <h2 style="color: #333; margin-top: 40px;">Todos</h2>
            
            <!-- Lista de Todos -->
            <ul style="list-style: none; padding: 0; width: 500px; margin: 0 auto;">
                ${hardcodedTodos.map(todo => `
                    <li style="background: white; margin: 10px 0; padding: 15px; border-radius: 6px; border-left: 5px solid #5cb85c; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-align: left; font-size: 1.1em;">
                        ${todo}
                    </li>
                `).join('')}
            </ul>

            <p style="font-size: 0.85em; color: #888; margin-top: 40px;">DevOps with Kubernetes 2026</p>
        </body>
        </html>
    `);
});

server.listen(port, () => {
    console.log(`Server started in port ${port}`);
});