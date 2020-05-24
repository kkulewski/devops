const express = require('express');
const app = express();

const {v4: uuidv4} = require('uuid');

const appId = uuidv4();

const port = 5000;

const redis = require('redis');
const redisClient = redis.createClient({
  host: "redis-serivce",
  port: 6379,
  retry_strategy: () => 1000
});

app.get('/', (req, resp) => {
    resp.send(`[${appId}] Hello from my backend app`)
});

app.listen(port, err => {
    console.log(`Listening on port ${port}`);
});