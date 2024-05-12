const express = require('express');
const {engine} = require('express-handlebars');

const port = 3001

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home', {
    posts: ["Post 1", "Post 2", "Post 3", "Post 4"], 
    LoggedIn: true
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
