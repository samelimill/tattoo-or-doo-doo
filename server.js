const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
	secret: 'Super secret secret',
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize
	}),
};

app.use(session(sess));

const hbs = exphbs.create({
	defaultLayout: 'main',
	partialsDir: path.join(__dirname, 'views/partials'),
});

// Configure Handlebars as the template engine
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(routes);


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/public'))
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/login', async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ where: { username } });

	if (!user) {
		res.status(401).json({ message: 'Are you messing with me? Invalid username or password.' });
	} else {
		const validPassword = await bcrypt.compare(password, user.password);

		if (validPassword) {
			req.session.user = user;

			res.redirect('/dashboard');
		} else {
			res.status(401).json({ message: 'Are you messing with me? Invalid username or password.' });
		}
	}
});

app.get('/signup', (req, res) => {
	res.render('signup');
});


// Synchronize the model with the database
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
