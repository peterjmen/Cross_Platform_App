// TODO: Create backend server

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(3_001, () => {
    console.log('Server listening on port 3001');
});
