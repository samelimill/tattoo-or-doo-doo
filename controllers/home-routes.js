const router = require('express').Router();

// Home Route
router.get('/', async (req, res) => {
	res.redirect('login');
});

// Login Route
router.get('/login', async (req, res) => {

	res.render('login');
});

// Signup Route
router.get('/signup', async (req, res) => {
	res.render('signup');
});

// Gallery Route
router.get('/gallery', (req, res) => {
	console.log(req.session.user);
	if (!req.session.user) {
		return res.redirect('/login');
	}

	res.render('gallery', { User: req.session.user });
});

router.get('/createpost', (req, res) => {
  if (!req.session.user) {
		return res.redirect('/login');
	}
  console.log(req.session.user);
  res.render('createpost', { User: req.session.user })
});

// Homepage Route
router.get('/homepage', (req, res) => {
	res.render('homepage');
});

// About Route
router.get('/about', (req, res) => {
	if (!req.session.user) {
		return res.redirect('/login');
	}
	res.render('about');
});

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
})

module.exports = router;
