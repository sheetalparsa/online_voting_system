const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 4000;

app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

// define a root/default route
app.get('/', (req, res) => {
    res.json({"message": "Hello World"});
});

// Require User routes
const userRoutes = require('./src/routes/user.routes')

// Require Candidate routes
const candidateRoutes = require('./src/routes/candidate.routes')

// Require Voter routes
const voterRoutes = require('./src/routes/voter.routes')

// Require Admin routes
const adminRoutes = require('./src/routes/admin.routes')


// using as middleware
app.use('/api', userRoutes)
app.use('/api', candidateRoutes)
app.use('/api', voterRoutes)
app.use('/api', adminRoutes)


// listen for requests
app.listen(port, () => {
    console.log(`Node server is listening on port ${port}`);
});
