'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const connectMongo = require('./common/mongoDb');
const config = require('./config');
const routes = require('./routes/index');

class Server {
    constructor() {
        this.app = null;
    }
    start() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        connectMongo();
        this.app.listen(config.port, (req, res) => {
            console.log(`Server is running on ${config.port} port.`);
        });
        this.app.use('/api/', routes);
    }
}

const server = new Server();
server.start();