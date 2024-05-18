// BlogPost.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const BlogPost = sequelize.define('BlogPost', {
  // Define attributes...
});

module.exports = BlogPost;
