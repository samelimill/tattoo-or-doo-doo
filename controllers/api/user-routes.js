const { check, validationResult } = require('express-validator');
const router = require('express').Router();
const { User, Tattoo, Comment } = require('../../models');

// Authorization middleware
function requireLogin(req, res, next) {
	if (!req.session.loggedIn) {
		res.redirect('/login');
	} else {
		next();
	}
}

// Login
router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;

		// Find the user by username
		const user = await User.findOne({ where: { username } });

		// If user doesn't exist, send an error
		if (!user) {
			req.session.message = {
				type: 'error',
				message: 'Invalid username or password.',
			};
			return res.redirect('/login');
		}

		// Check the password
		const isPasswordCorrect = user.checkPassword(password);
		console.log(isPasswordCorrect);

		// If the password is incorrect, send an error
		if (!isPasswordCorrect) {
			req.session.message = {
        type: 'error',
        message: 'Invalid username or password.',
      };
      return res.redirect('/login');
		}

		// If everything is OK, log in the user
		req.session.user = user;
		req.session.loggedIn = true;
		res.json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

router.post('/hotornot', async (req, res) => {
	try {
		const math = Math.floor(Math.random() * 10) + 1;
		const tattoo = await Tattoo.findOne({ where: { id: math } });
		console.log(tattoo);
		res.send(tattoo)
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

router.put('/post', async (req, res) => {
	console.log(req.body);
	try {
    await Tattoo.update({points: req.body.score}, {
      where: {
        id: req.body.id
      }
    });
    res.json({ message: 'Rating updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Like a post
router.post('/posts/:postId/like', requireLogin, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.session.user.id;

    // Check if the user has already liked this post
    const existingLike = await Like.findOne({ where: { postId, userId } });
    if (existingLike) {
      return res.status(400).json({ message: 'You have already liked this post' });
    }

    const newLike = await Like.create({ postId, userId });

    // Calculate the post score
    const likesCount = await Like.count({ where: { postId } });
    const dislikesCount = await Dislike.count({ where: { postId } });
    const score = likesCount - dislikesCount;

    // Update the post's score in the database
    await Post.update({ score }, { where: { id: postId } });


    res.status(201).json({ likeCount: likesCount, score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Dislike a post
router.post('/posts/:postId/dislike', requireLogin, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.session.user.id;

    const existingDislike = await Dislike.findOne({ where: { postId, userId } });
    if (existingDislike) {
      return res.status(400).json({ message: 'You have already disliked this post' });
    }

    const newDislike = await Dislike.create({ postId, userId });

    // Calculate the post score
    const likesCount = await Like.count({ where: { postId } });
    const dislikesCount = await Dislike.count({ where: { postId } });
    const score = likesCount - dislikesCount;

    // Update the post's score in the database
    await Post.update({ score }, { where: { id: postId } });

    res.status(201).json({ dislikeCount: dislikesCount, score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Sign-up
router.post(
	'/signup',
	[
		check('username').notEmpty().withMessage('Username is required'),
		check('email').isEmail().withMessage('Email is not valid'),
		check('password')
			.isLength({ min: 8 })
			.withMessage('Password must be at least 8 characters long'),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { username, email, password } = req.body;

			// Create a new user
			const newUser = await User.create({
				username,
				email,
				password,
			});

			// Log in the user
			req.session.user = newUser;
			req.session.loggedIn = true;

			// Respond with the newly created user
			res.status(201).json(newUser);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}
);

// Logout
router.post('/logout', (req, res) => {
		req.session.destroy((err) => {
      if (err) {
        return res.redirect('/homepage');
      }
      res.clearCookie('sid');
      res.redirect('/login');
		});
});

// New Tattoo Route
router.post('/tattoo', async (req, res) => {
	console.log(req.body);
	  try {
		  const { title, description, imgUrl, artist, userId } = req.body; // Adjust the fields according to your Tattoo model
  
		  const newTattoo = await Tattoo.create({
			  title,
			  description,
			  imgUrl,
			  artist,
			  userId,
		  });
  
		  res.status(201).json(newTattoo); // Respond with the newly created tattoo post
	  } catch (err) {
		  console.error(err);
		  res.status(500).json({ message: 'Internal Server Error' });
	  }
  });

// Comment Routes
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

// Authentication routes
router.get('/profile', requireLogin, (req, res) => {
	const user = req.session.user;
	res.render('profile', { user });
});

module.exports = router;
