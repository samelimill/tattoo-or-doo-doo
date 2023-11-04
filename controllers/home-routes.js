const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('login');
})

router.get('/login', async (req, res) => {
  res.render('login');
});

// route for signup
router.get('/signup', async (req, res) => {
  res.render('signup');
});

// route for user's profile
router.get('/profile', async (req, res) => {
  res.render('profile');
});

// route for homepage
router.get('/homepage', (req, res) => {
  res.render('homepage');
});

router.get('/gallery', (req, res) => {
  res.render('gallery');
});

router.get('/leaderboard', (req, res) => {
  res.render('leaderboard');
});

module.exports = router;

