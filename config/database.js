const Sequelize = require('sequelize');


const sequelize = new Sequelize('blog_db', 'username', 'password', {
  dialect: 'mysql2',
  host: 'localhost',
  port: 3306, // Optional: Specify the port number
  logging: false, // Optional: Disable logging
  timezone: '+00:00', // Optional: Specify the time zone
  // Other options...
});
