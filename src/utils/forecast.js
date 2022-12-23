const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=964c8e3fade42f7f71a7841ae7c5aeb9&query=${latitude},${longitude}`;

	request({ url, json: true }, (error, { body }) => {
		const { error: serviceError, current } = body;
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (serviceError) {
			callback('Unable to find location', undefined);
		} else {
			callback(
				undefined,
				`${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`
			);
		}
	});
};

module.exports = forecast;
