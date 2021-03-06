const { getDataFromCongress } = require('./api-congresso/congress-data');
const db = require('./db/index');
const mongoose = require('mongoose');
const express = require('express');
const routes = require('routes');
const cors = require('cors');
const path = require('path');
var schedule = require('node-schedule');


//getDataFromCongress();



mainServerAndClient()
//mongoose.connection.close();


async function main() {
    const app = express();

    await db.connect( );

    app.use(cors());
    app.use(require('./routes'));

    

    app.listen(3333);
    console.log("Listening port 3333");
}
 
async function mainServerAndClient() {
    const app = express();

    await db.connect();

    app.use(cors());
    app.use(require('./routes'));
    
    //process.env.NODE_ENV = 'production';

    if (process.env.NODE_ENV === "production"){

        app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
            console.log("Serving at production"); 
        });

    }
    
    const port = process.env.PORT || 3333;
    app.listen(port, () => {
        db.checkAndUpdateDatabase()    
        console.log(`Server started on port ${port}`)});
    
    
    var rule = new schedule.RecurrenceRule;
    rule.hour = 24;
    schedule.scheduleJob(rule, async () => {
        
        updates = await db.checkAndUpdateDatabase()
        numUpdates = updates.reduce((accumulator, currentValue) => (accumulator + currentValue));
        console.log(`Database update done. Total of ${numUpdates} updates`);
    });
    
    
}

