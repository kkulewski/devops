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


app.get('/', (req, resp) => {

    const dbKey = "visit-counter";
    redisClient.get(dbKey, (err, counterValue) => {

        if (!counterValue) {
            counterValue = 0;
        }

        const newValue = parseInt(counterValue) + 1;
        redisClient.set(dbKey, newValue);
        resp.send(`[${appId}] Hello! ${newValue} visits so far.`);

    });

});

app.listen(port, e => {
    console.log(`Listening on port ${port}`);
});
