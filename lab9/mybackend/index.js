const express = require('express');
const app = express();

const {v4: uuidv4} = require('uuid');

const appId = uuidv4();

const port = 5000;

const redis = require('redis');
const redisClient = redis.createClient({
  host: "redis-service",
  port: 6379
});

const { Pool } = require('pg');
const pgClient = new Pool({
  host: "postgres-service",
  port: 5432,
  user: "postgres",
  password: "pgpassword123",
  database: "postgres"
});
pgClient
  .on('error', () => console.log('Cannot connect to PG database.'));
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

app.listen(port, e => {
    console.log(`Listening on port ${port}`);
});
