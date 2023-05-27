/**
 * Base class for controllers.
 * @abstract
 */
class Controller {
    /**
     * A reference to the server instance.
     * @type {import('../Server').Server}
     */
    server;

    /**
     * A reference to the database instance.
     * @type {import('./Database').Database}
     */
    database;

    /**
     * @param {import('../Server').Server} server The server instance.
     */
    constructor(server) {
        this.server = server;
        this.database = server.database;
    }

    /**
     * Sends a success response.
     * @param {import("express").Response} res The express response object.
     * @param {Record<string, any>} data JSON data to send.
     * @param {number} status HTTP status code.
     * @returns The response.
     */
    success(res, data, status = 200) {
        return res.status(status).json({
            success: true,
            ...data,
        });
    }

    /**
     * Sends an error response.
     * @param {import('express').Response} res The express response object.
     * @param {number} status HTTP status code.
     * @param {string} details An error message, human-readable.
     * @returns The response.
     */
    error(res, status, details) {
        return res.status(status).json({
            success: false,
            details,
        });
    }
}

module.exports = { Controller };
