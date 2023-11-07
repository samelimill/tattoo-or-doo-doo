
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const flash = require('connect-flash');

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
	helpers: {
		asset: function (filePath) {
			return path.join('/public/images/', filePath);
		}
	}
});

// Configure Handlebars as the template engine
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(routes);

// Synchronize the model with the database
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
