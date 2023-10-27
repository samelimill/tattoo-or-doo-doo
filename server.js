const express = require('express');
const exphbs = require('express-handlebars');
const Sequelize = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Sequelize
const sequelize = new Sequelize('your_database', 'your_user', 'your_password', {
  host: 'localhost',
  dialect: 'mysql', // Change this to your preferred database
});

// Define your Sequelize model
const User = sequelize.define('User', {
  // Define your model properties here
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  // Add more fields as needed
});

// Synchronize the model with the database
sequelize.sync()
  .then(() => {
    console.log('Database and tables created.');
  })
  .catch(err => {
    console.error('Database synchronization error:', err);
  });

// Configure Handlebars as the template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Configure other parts of your application, like routes
app.get('/', (req, res) => {
  // You can add your route logic here, including rendering views with Handlebars
  res.render('index', { title: 'My Express App' });
});

// Serve static files (CSS, JavaScript, images, etc.) from the public directory
app.use(express.static('public'));

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});