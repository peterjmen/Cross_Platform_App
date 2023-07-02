require('dotenv').config();
const { Server } = require('./Server');
const { Database } = require('./structures/Database');

main();
async function main() {
    const database = new Database();
    await database.connect();

    // Add some default data, would not normally do this in production
    // Its purpose is for marking, so you can see the app working
    require('./seed');

    const port = Number(process.env.PORT);
    if (Number.isNaN(port)) throw new Error('Invalid port number');
    const server = new Server({ port, version: 1 }, database);
    await server.listen();

    process.on('SIGINT', async () => {
        await database.disconnect();
        process.exit(0);
    });

    // Assign to global for use in REPL, never actually access these in code
    global.__server = server;
    global.__database = database;
}
