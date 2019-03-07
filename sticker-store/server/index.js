const express = require('express');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const port = config.port;
const app = express();

require('./config/db')(config);

app.listen(port, () => {
    console.log(`Server listening onn port ${port}...`);
})