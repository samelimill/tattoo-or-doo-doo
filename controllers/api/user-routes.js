const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

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

// Sign-up
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email is already taken
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password, // You should hash the password before saving it
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(201).json({ user: newUser, message: 'You are now signed up and logged in!' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const UserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!UserData) {
      res
      .status(400)
      .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = await UserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
      .status(400)
      .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
      .status(200)
      .json({ user: UserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;