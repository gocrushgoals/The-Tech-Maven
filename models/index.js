const BlogPost = require('./models/blogPost');
const User = require('./models/User');

const sequelize = require('./config/database');



// Function to synchronize models with database
async function syncDatabase() {
  try {
    await sequelize.sync({ force: false }); // Set force to true to drop existing tables
    console.log('Database synced');
  } catch (error) {
    console.error('Error syncing database:', error.message);
    // Add logic to handle synchronization errors, such as retrying or falling back to a default state
    // For demonstration, let's just exit the application if synchronization fails
    process.exit(1);
  }
}

// Call the syncDatabase function to synchronize models with database
syncDatabase();
