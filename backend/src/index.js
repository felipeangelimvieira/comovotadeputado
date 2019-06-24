const { getDataFromCongress } = require('./api-congresso/congress-data');
const db = require('./db/index');
const mongoose = require('mongoose');
const express = require('express');
const routes = require('routes');

//getDataFromCongress();



main()
//mongoose.connection.close();


async function main() {
    const app = express();

    await db.connect();

    app.use(require('./routes'));

    app.listen(3333);
    console.log("Listening port 3333");
}