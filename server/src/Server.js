const express = require('express');
const cors = require('cors');
const { Database } = require('./structures/Database');
const { usersRoutes } = require('./routes/users');
const { exercisesRoutes } = require('./routes/exercises');
const { programsRoutes } = require('./routes/programs');

/**
 * "Wrapper" around the express server.
 */
class Server {
    /**
     * @param {ServerOptions} options Configuration options.
     * @param {Database} database The database connection.
     */
    constructor(options, database) {
        this.options = options;
        this.rest = express();
        this.database = database;
    }

    /**
     * Starts the server.
     * @returns {Promise<void>}
     */
    async listen() {
        const { port, version } = this.options;

        this.rest.use(cors({ origin: '*' }));

        this.rest.use(
            `/v${version ?? 0}`,
            express.json(),

            // Routes
            usersRoutes(this, this.database),
            exercisesRoutes(this, this.database),
            programsRoutes(this, this.database),

            // Route not found
            (_, res) =>
                res.status(404).json({ success: false, details: 'Not found' }),

            // Internal server error
            (err, _, res) => {
                console.error(err);
                res.status(500).json({
                    success: false,
                    details: 'Internal server error',
                });
            }
        );

        return new Promise(resolve => {
            this.rest.listen(port, () => {
                console.info(`Server listening on port ${port}`);
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
