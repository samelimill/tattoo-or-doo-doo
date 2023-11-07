const { check, validationResult } = require('express-validator');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Post, Comment } = require('../../models');

// Authorization middleware
function requireLogin(req, res, next) {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    next();
  }
}

// Create a new tattoo post
router.post('/tattoos', async (req, res) => {
  try {
    const { title, description, artist, imageUrl } = req.body; // Adjust the fields according to your Tattoo model

    const newTattoo = await Tattoo.create({
      title,
      description,
      artist,
      imageUrl,
      userId,
    });

    res.status(201).json(newTattoo); // Respond with the newly created tattoo post
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add a comment to a user post
router.post('/posts/:postId/comments', async (req, res) => {
  try {
    const { text, userId } = req.body; // Adjust the fields according to your Comment model

    // Check if the post with postId exists
    const post = await Post.findByPk(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create a new comment
    const newComment = await Comment.create({
      text,
      userId,
      postId: post.id, // Associate the comment with the post
    });

    res.status(201).json(newComment); // Respond with the newly created comment
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Sign-up
router.post('/signup', [
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Email is not valid'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser); // Respond with the newly created user
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // If user doesn't exist, send an error
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If the password is incorrect, send an error
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // If everything is correct, respond with the user
    req.session.user = user;
    req.session.loggedIn = true;
    req.flash('success', 'You are now logged in!')
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      req.flash('success', 'You are now logged out!')
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Authentication routes
router.get('/profile', requireLogin, (req, res) => {
  const user = req.session.user;
  res.render('profile', { user });
});

module.exports = router;