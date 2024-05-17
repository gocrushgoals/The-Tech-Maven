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

BlogPost.hasMany(Comment); // Define one-to-many association with Comment model

module.exports = BlogPost;
