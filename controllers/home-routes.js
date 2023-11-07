const router = require('express').Router();

// home route
router.get('/', async (req, res) => {
  res.render('login');
})

// login route
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

// route to make sure user is logged in and get user data
router.get('/profile', (req, res) => {
  if (!req.session.user) {
    req.flash('error', 'You must be logged in to view this page.')
    return res.redirect('/login');
  }

  req.flash('success', 'You are now logged in!')
  res.render('profile', { User: req.session.user});
});

// route for homepage
router.get('/homepage', (req, res) => {
  res.render('homepage');
});

// route for about page
router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;

