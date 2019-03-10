const express = require('express');
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const port = config.port;
const app = express();

const authRouter = require('./routes/auth');
const tagRouter = require('./routes/tag');

require('./config/db')(config);

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRouter);
app.use('/tag', tagRouter);

app.listen(port, () => {
    console.log(`Server listening onn port ${port}...`);
})