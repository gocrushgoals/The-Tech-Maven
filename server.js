const express = require('express');
const {engine} = require('express-handlebars');

const port = 3001

const app = express();


app.use(express.static('public'));
app.enable('view cache');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//restful routes
app.get('/', (req, res) => {
  res.render('home', {
    posts: ["Post 1", "Post 2", "Post 3", "Post 4"], 
    LoggedIn: true
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});


// Define a route for the about page
app.get('/about', (req, res) => {
    res.send('About Us');
});

// Define a route for the contact page
app.get('/contact', (req, res) => {
    res.send('Contact Us');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
