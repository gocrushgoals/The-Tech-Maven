require('dotenv').config();
const express = require('express');
const session = require('express-session');
const exphbs  = require('express-handlebars');
const path = require('path');

const Sequelize = require('sequelize');
// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// create database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  port: process.env.DB_PORT
});

const connection = require('./config/connection');
const BlogPost = require('./models/BlogPost');
const User = require('./models/user'); // Import your User model

const app = express();
const port = process.env.PORT || 3001;

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  app.use(express.static(path.join(__dirname, 'public')));
 

const sess = {
  secret: 'ikel23jslwer0lnmciek',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: false,
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

// Define routes
// Home Page Route
app.get('/', (req, res) => {
  res.render('home', {
      pageTitle: 'Maven Tech Blog',
      loggedIn: req.session.loggedIn, // Assuming you have a session with loggedIn property
      posts: ["Post 1", "Post 2", "Post 3", "Post 4"] // Sample posts
  });
});

// Dashboard Page Route
app.get('/dashboard', (req, res) => {
  // Render the dashboard template with posts data
  res.render('dashboard', {
      pageTitle: 'Dashboard',
      loggedIn: req.session.loggedIn, // Assuming you have a session with loggedIn property
      posts: [] // Placeholder for posts data from database
  });
});

// Login Page Route
app.get('/login', (req, res) => {
  res.render('login', {
      pageTitle: 'Login'
  });
});

// Login Form Submission Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if user exists in the database
      const user = await User.findOne({ where: { email } });

      if (!user) {
          // If user doesn't exist, redirect back to login page with error message
          return res.render('login', {
              pageTitle: 'Login',
              errorMessage: 'Invalid email or password'
          });
      }

      // Verify user's password
      const isPasswordValid = await user.checkPassword(password);

      if (!isPasswordValid) {
          // If password is incorrect, redirect back to login page with error message
          return res.render('login', {
              pageTitle: 'Login',
              errorMessage: 'Invalid email or password'
          });
      }

      // If email and password are correct, set user session and redirect to dashboard or homepage
      req.session.user = user;
      res.redirect('/dashboard'); // Change '/dashboard' to the appropriate destination after login
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Signup Page Route
app.get('/signup', (req, res) => {
  res.render('signup', {
      pageTitle: 'Sign Up'
  });
});

// Signup Form Submission Route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
      // Check if user with the same email already exists in the database
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
          // If user with the same email already exists, redirect back to signup page with error message
          return res.render('signup', {
              pageTitle: 'Sign Up',
              errorMessage: 'User with this email already exists'
          });
      }

      // Create a new user in the database
      const newUser = await User.create({
          username,
          email,
          password // Note: You should hash the password before saving it to the database for security
      });

      // If user is successfully created, set user session and redirect to dashboard or homepage
      req.session.user = newUser;
      res.redirect('/dashboard'); // Change '/dashboard' to the appropriate destination after signup
  } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).send('Internal Server Error');
  }
});

// POST Route for Adding New Blog Post
app.post('/posts/new', (req, res) => {
  // Handle requests to add a new blog post
  BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.user.id
  }).then(() => {
      res.redirect('/dashboard');
  });
});

// POST Route for Updating Blog Post
app.post('/posts/:id/update', (req, res) => {
  // Handle requests to update an existing blog post
  BlogPost.update({
      title: req.body.title,
      content: req.body.content
  }, {
      where: {
          id: req.params.id
      }
  }).then(() => {
      res.redirect('/dashboard');
  });
});

// POST Route for Deleting Blog Post
app.post('/posts/:id/delete', (req, res) => {
  // Handle requests to delete an existing blog post
  BlogPost.destroy({
      where: {
          id: req.params.id
      }
  }).then(() => {
      res.redirect('/dashboard');
  });
});

// GET Route for Individual Blog Post
app.get('/posts/:id', (req, res) => {
  // Render a single blog post with its details and comments
  res.render('post', {
      pageTitle: 'Post Title',
      loggedIn: req.session.loggedIn, // Assuming you have a session with loggedIn property
      post: {
          title: 'Post Title',
          content: 'Post Content',
          comments: [
              {
                  username: 'User 1',
                  content: 'Comment 1'
              },
              {
                  username: 'User 2',
                  content: 'Comment 2'
              }
          ]
      }
  });
});

// POST Route for Adding Comment
app.post('/posts/:id/comment', (req, res) => {
  // Handle requests to add a comment to a blog post
  res.redirect(`/posts/${req.params.id}`);
});

// Logout Route
app.get('/logout', (req, res) => {
  // Handle logout logic (clear session, redirect to home page, etc.)
  req.session.destroy((err) => {
      if (err) {
          console.error('Error destroying session:', err);
          return res.sendStatus(500);
      }
      // Redirect to home page after logout
      res.redirect('/');
  });
});


// Initialize Sequelize connection
sequelize.sync({ force: false }).then(() => {
  app.listen(port, function () {
    console.log(`App listening on port ${port}`);
  });
});