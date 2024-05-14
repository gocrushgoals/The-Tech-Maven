// BlogPost.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BlogPost = sequelize.define('BlogPost', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// BlogPost.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Comment = require('./Comment');

const BlogPost = sequelize.define('BlogPost', {
  // Attributes...
});

BlogPost.hasMany(Comment); // One-to-many association

module.exports = BlogPost;


module.exports = BlogPost;
