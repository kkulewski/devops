const keys = require('./keys');
const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const cors = require('cors');

// LOG KEYS FROM ENV
console.log(keys);

// CREATE EXPRESS APP
const app = express();
app.use(cors());
app.use(bodyParser.json());

// CREATE POSTGRES CLIENT
const { Pool } = require('pg');
const pgClient = new Pool({
	host: keys.pgHost,
	port: keys.pgPort,
	user: keys.pgUser,
	password: keys.pgPassword,
	database: keys.pgDatabase
});

pgClient
	.on('error', () => console.log('Lost PG connection'));

pgClient
	.query('CREATE TABLE IF NOT EXISTS gcd_values (number INT);')
	.catch(err => console.log(err));

// CREATE REDIS CLIENT
const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort
});


// START EXPRESS APP
app.listen(5000, err => {
	console.log('Backend listening')
})


// FETCH COMPUTED RESULTS FROM POSTGRES
app.get('/values', (request, response) => {

	pgClient
		.query('SELECT * FROM gcd_values;', (pgError, queryResult) => {
			response.send(queryResult.rows)
		});

});


// COMPUTE RESULT + STORE IT IN POSTGRES OR USE REDIS CACHE
app.get('/:num1,:num2', (request, response) => {

	const num1 = parseInt(request.params.num1);
	const num2 = parseInt(request.params.num2);

	const dbGCD = [num1, num2].sort().toString();

	redisClient.get(dbGCD, (err, cachedGCD) => {

		if (!cachedGCD) {
			const computedGCD = computeGCD(num1, num2);

			pgClient
				.query("INSERT INTO gcd_values (number) VALUES ('" + computedGCD + "');")
				.catch(pgError => console.log(pgError));

			redisClient.set(dbGCD, computedGCD);

			response.send('GCD(' + num1 + ',' + num2 + ') == ' + computedGCD + ' (computed now)');
		}
		else {
			response.send('GCD(' + num1 + ',' + num2 + ') == ' + cachedGCD + ' (from cache)');
		}

	});

});

const computeGCD = (a, b) => {

	a = Math.abs(a);
	b = Math.abs(b);

	while (b) {
		var tmp = b;
		b = a % b;
		a = tmp;
	}
	
	return a;
}
