// routes/index.js

const express = require('express');
const router = express.Router();

// Import route files
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// Mount route files as middleware
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;
