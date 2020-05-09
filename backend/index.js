const keys = require('./keys');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const { Pool } = require('pg');
const pgClient = new Pool({
  host: keys.pgHost,
  port: keys.pgPort,
  user: keys.pgUser,
  password: keys.pgPassword,
  database: keys.pgDatabase
});
pgClient
  .on('error', () => console.log('Cannot connect to PG database.'));
setTimeout(() => {
  pgClient
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(err => console.log(err))
    .then(() => console.log("PG table initialized."));
}, 5000);



const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});


const port = 5000;
app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`);
  console.log(keys);
})

app.get('/', (request, response) => {
  response.status(200).send("Hello from Backend!");
});

app.get('/pow/:base,:exponent', (request, response) => {

  const base = parseInt(request.params.base);
  const exponent = parseInt(request.params.exponent);
  const powerDbKey = [base, exponent].toString();

  redisClient.get(powerDbKey, (err, cachedPower) => {

    payload = {}

    if (!cachedPower) {
      const computedPower = Math.pow(base, exponent);
      redisClient.set(powerDbKey, computedPower);
      pgClient
        .query("INSERT INTO values (number) VALUES ($1)", [computedPower])
        .catch(pgError => console.log(pgError));
      
      payload.result = computedPower;
      payload.from = "computation";
    }
    else {
      payload.result = cachedPower;
      payload.from = "cache";
    }
    
    response.send(payload);
  });
});

app.get('/history', (request, response) => {
  pgClient.query('SELECT * FROM values;', (pgError, queryResult) => {
    if (!queryResult.rows) {
      response.json([]);
    }
    else {
      response.json(queryResult.rows);
    }
  });
});
