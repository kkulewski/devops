const express = require('express');
const {v4: uuidv4} = require('uuid');

const app = express();
const appId = uuidv4();


app.get('/', (req, resp) => {
    resp.send(`[${appId}] Hello!`);
});

app.listen(5000, e => {
    console.log(`Listening on port 5000`);
});
