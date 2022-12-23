const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// Override express view engine with handlebars
app.set('view engine', 'hbs');

// Override handlebars default views path (/views)
app.set('views', viewsPath);

//  Set handlebars partials path
hbs.registerPartials(partialsPath);

// Get all content from /public folder
app.use(express.static(publicDirectoryPath));

// Inject index.hbs view into root (index)
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Vítor Marques',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Vítor Marques',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'This is some helpful text.',
		title: 'Help',
		name: 'Vítor Marques',
	});
});

app.get('/weather', (req, res) => {
	const address = req.query.address;
	if (!address) {
		return res.send({
			error: 'You must provide an address',
		});
	}

	geocode(address, (error, { location, latitude, longitude } = {}) => {
		if (error) {
			return res.send({
				error,
			});
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({
					error,
				});
			}
			res.send({
				forecast: forecastData,
				location,
				address,
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({ error: 'You must provide a search term' });
	}

	console.log(req.query);

	res.send({
		products: [],
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', { errorMessage: 'Help article not found', name: 'Vítor Marques', title: '404' });
});

app.get('*', (req, res) => {
	res.render('404', { errorMessage: 'Page not found', name: 'Vítor Marques', title: '404' });
});

app.listen(port, () => {
	console.log('Server is up on port ' + port + '.');
});
