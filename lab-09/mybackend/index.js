const express = require('express');
const {v4: uuidv4} = require('uuid');
const redis = require('redis');
const { Pool } = require('pg');
const keys = require("./keys");

const app = express();
const appId = uuidv4();


const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort
});

const pgClient = new Pool({
  host: keys.pgHost,
  port: keys.pgPort,
  user: keys.pgUser,
  password: keys.pgPassword,
  database: keys.pgDatabase
});

pgClient.on('error', () => console.log('Cannot connect to PG database.'));
setTimeout(() => {
  pgClient
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(err => console.log(err))
    .then(() => console.log("PG table initialized."));
}, 5000);


app.get('/', (req, resp) => {

    const dbKey = "visit-counter";
    redisClient.get(dbKey, (err, counterValue) => {

        if (!counterValue) {
            counterValue = 0;
        }

        const newValue = parseInt(counterValue) + 1;
        redisClient.set(dbKey, newValue);

        pgClient
            .query("INSERT INTO values (number) VALUES ($1)", [newValue])
            .catch(pgError => console.log(pgError));

        pgClient.query('SELECT * FROM values;', (pgError, queryResult) => {
            if (!queryResult.rows) {
                response.json([]);
            }
            else {
                resp.send(`[${appId}] Hello!
                <br/>Visits (from Redis cache): ${newValue} so far
                <br/>Numbers (from PostgreSQL): ${JSON.stringify(queryResult.rows)}`);
            }
        });

    });

});

app.listen(keys.backendPort, e => {
    console.log(`Listening on port ${keys.backendPort}`);
});
