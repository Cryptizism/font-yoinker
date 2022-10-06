//express
const express = require('express');
const app = express();
//enviroment variables
require('dotenv-safe').config();
//routes
var mainRouter = require('./routes/main');
//chalk for logging
const chalk = require('chalk');
//middleware
var favicon = require('serve-favicon')
var path = require('path')

process.setMaxListeners(0);

//Set render engine
app.set('view engine', 'ejs');

app.use('/', mainRouter);
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
app.use(express.static('public'));

//Starts listening on the port
app.listen(process.env.PORT, () => {
    console.log(chalk.green("Server is listening on port ") + chalk.blue(process.env.PORT));
});