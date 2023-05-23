const process = require('node:process');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

/**
 * "Wrapper" around the database connection.
 */
class Database {
    /**
     * The database connection.
     * @see {@link https://mongoosejs.com/docs/api/connection.html}
     */
    connection;

    /**
     * Connects to the database.
     */
    async connect() {
        const uri = await this.generateDatabaseUri();
        this.connection = mongoose.createConnection(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.info('Connected to database');
    }

    /**
     * Disconnects from the database.
     */
    async disconnect() {
        if (this.connection) {
            await this.connection.disconnect();
            console.info('Disconnected from database');
        }
    }

    /**
     * Generates a database URI based on the environment.
     * @returns {Promise<string>} The database URI.
     */
    async generateDatabaseUri() {
        if (process.env['NODE_ENV'] === 'production') {
            console.info('Using production database');
            return process.env['MONGODB_URI'];
        } else {
            // Uses a memory database for development
            console.info('Using in-memory database');
            const server = await MongoMemoryServer.create();
            return server.getUri();
        }
    }
}

module.exports = { Database };
