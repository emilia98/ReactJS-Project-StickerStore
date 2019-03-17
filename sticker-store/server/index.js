const express = require('express');
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const port = config.port;
const app = express();

const authRouter = require('./routes/auth');
const tagRouter = require('./routes/tag');
const categoryRouter = require('./routes/category');
const cloudinary = require('cloudinary');

require('./config/db')(config);
require('./config/passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

cloudinary.config({
  cloud_name: 'offer-shop',
  api_key: '497656127117822',
  api_secret: 'w3_3Ro9kUEeIp3IOaLQvt1se1ZI'
});

app.use('/auth', authRouter);
app.use('/tag', tagRouter);
app.use('/category', categoryRouter);
app.use('/sticker', require('./routes/sticker'));
app.use('/user', require('./routes/user'));

app.listen(port, () => {
    console.log(`Server listening onn port ${port}...`);
})