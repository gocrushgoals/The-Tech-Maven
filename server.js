const express = require('express');
const {engine} = require('express-handlebars');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const { Op } = require('sequelize');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Notification } = require('./models');
const { resourceLimits } = require('worker_threads');

const app = express();

const port = process.env.PORT || 3001;



// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });


const sess = {
  secret: 'ikel23jslwer0lnmciek', 
  //Session
  cookie: {
    //When the cookie expires
    maxAge: 1000 * 60 * 60 * 24 * 7,
    //prevents the cookie from being accessed by client-side JS
    httpOnly: true,
    //server and client will only be able to read the cookie if it is marked as secure
    secure: false,
    //Only sites on the same domain can read the cookie
    sameSite: 'strict',
  },
     //forces the session to be saved even if nothing changed
     resave: false,
    //forces a session to be saved when it is new regarless of changes
    saveUninitialized: true,
    //where to store the session on the server
    store: new SequelizeStore({
      db: sequelize
    })
  
};

app.use(session(sess));


//Inform Express.js to use the Handlebars.js engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.post('/login', function (req, res) { 
  //verify user credentials

    req.session.save(function (err) {
      req.session.id = req.body.id;
      req.session.username = req.body.username;
      res.session.loggedIn = true;
      res.send('logged in');
 });
});

app.get('/', function (req, res) {
  res.render('home', {
    posts: ["Post 1", "Post 2", "Post 3", "Post 4"],
    LoggedIn: true
  });
});


app.get('/about', function (req, res) {
  res.send('About Us');
});

app.get('/contact', function (req, res) {
  res.send('Contact Us');
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});