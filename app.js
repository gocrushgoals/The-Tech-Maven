const express = require('express');
const session = require('express-session');
const exphbs  = require('express-handlebars');
const path = require('path');

const sequelize = require('./config/connection');
const BlogPost = require('./models/BlogPost');

const app = express();
const port = process.env.PORT || 3001;

const sess = {
  secret: 'ikel23jslwer0lnmciek',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
};


// Initialize Handlebars engine
const hbs = exphbs.create();

// Set up Handlebars engine with the create() function
app.engine('handlebars', hbs.engine);

// Set view engine to handlebars
app.set('view engine', 'handlebars');


app.set('views', path.join(__dirname, 'views'));

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', function (req, res) {
  // Verify user credentials
  req.session.save(function (err) {
    req.session.id = req.body.id;
    req.session.username = req.body.username;
    req.session.loggedIn = true;
    res.send('logged in');
  });
});

app.get('/', function (req, res) {
  res.render('home', {
    posts: ["Post 1", "Post 2", "Post 3", "Post 4"],
    loggedIn: true,
  });
});

// Initialize Sequelize connection
sequelize.sync({ force: false }).then(() => {
  app.listen(port, function () {
    console.log(`App listening on port ${port}`);
  });
});