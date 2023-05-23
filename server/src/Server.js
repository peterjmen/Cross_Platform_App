const express = require('express');
const { Database } = require('./structures/Database');

/**
 * "Wrapper" around the express server.
 */
class Server {
    /**
     * @param {ServerOptions} options Configuration options.
     * @param {Database} database The database connection.
     */
    constructor(options, database) {
        this.port = options.port;
        this.rest = express();
        this.database = database;

        this.rest.use(
            `/v${options.version ?? 0}`,
            express.json(),
            // TODO: Routes
            (_, res) => res.status(404).json({ success: false, message: 'Not yet implemented' }),
        );
    }

    /**
     * Starts the server.
     * @returns {Promise<void>}
     */
    async listen() {
        return new Promise(resolve => {
            this.rest.listen(this.port, () => {
                console.info(`Server listening on port ${this.port}`);
                resolve();
            });
        });
    }
}

/**
 * Options
 * @typedef {object} ServerOptions
 * @property {number} port The port to listen on.
 * @property {number} version The version of the API.
 */

module.exports = { Server };
