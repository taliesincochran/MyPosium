const express      = require("express");
const app          = express();
const bodyParser   = require("body-parser");
const mongoose     = require("mongoose");
const flash        = require('connect-flash');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const passport     = require('passport');
const userRoutes   = require("./routes/api/users");
const eventRoutes  = require("./routes/api/event");


// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/myposium"
mongoose.connect(
  MONGODB_URI,
  {
    useMongoClient: true
  }
);
//setting up cookie parser middleware
app.use(cookieParser());

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up static assets
app.use(express.static("client/build"));

// Configuring MongoDBStore
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

store
  .on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
  });

//Configuring express session
app.use(session({
    secret: '52e0d0v5h5t5r2e0s0s2cvb1j1j2k25u', // session secret
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    unset: 'destroy',
    resave: false,
    saveUninitialized: false,
    store: store
}));

//initializing passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport')(passport);

//bring in routes
app.use('/api/users', userRoutes);
app.use('/api/event', eventRoutes);

// Start the API server
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log(`The magic is happening on PORT ${PORT}!`);
});
