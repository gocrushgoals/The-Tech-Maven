const Sequelize = require('sequelize');


const sequelize = new Sequelize('blog_db', 'username', 'password', {
  dialect: 'mysql2',
  host: 'localhost',
  port: 3301, 
});
