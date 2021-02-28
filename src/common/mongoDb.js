const mongoose = require("mongoose");
const config = require("../config");
const dbUri = config.mongoURI;

const connectMongo = function () {
    mongoose.connect(dbUri);

    mongoose.connection.on('connected', function () {
        console.log("Mongoose default connection is open to ", dbUri);
    });

    mongoose.connection.on('error', function (err) {
        console.log("Mongoose default connection has occured " + err + " error");
    });

    mongoose.connection.on('disconnected', function () {
        console.log("Mongoose default connection is disconnected");
    });
}

module.exports = connectMongo;