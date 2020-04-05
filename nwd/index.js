const express = require("express");
const redis = require("redis");

const app = express();

const client = redis.createClient({
	host: 'redis-server',
	port: 6379
});


app.get('/:num1,:num2', (req, res) => {

	const num1 = parseInt(req.param('num1'));
	const num2 = parseInt(req.param('num2'));

	const dbGCD = [num1, num2].sort().toString();

	client.get(dbGCD, (err, cachedGCD) => {

		if (!cachedGCD) {
			const computedGCD = computeGCD(num1, num2);
			client.set(dbGCD, computedGCD);
			res.send("GCD(" + num1 + "," + num2 + ") == " + computedGCD + " (computed now)");
		}
		else {
			res.send("GCD(" + num1 + "," + num2 + ") == " + cachedGCD + " (from cache)");
		}

	});

});


app.listen(8080, () => {
	console.log("Listening on port 8080");
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