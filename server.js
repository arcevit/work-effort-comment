const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
let { connectDB } = require('./connect-db');
let { initializeDB } = require('./initialize-db');

connectDB();
initializeDB();

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());
app.use('/work_effort', routes);

app.listen(3000, () => console.log('Server Started'));
