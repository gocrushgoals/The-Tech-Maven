const sequelize = require('./config/database');
const BlogPost = require('./models/BlogPost');
const Comment = require('./models/Comment');
const User = require('./models/User');

// Synchronize models with database
sequelize.sync({ force: false }) // Set force to true to drop existing tables
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
