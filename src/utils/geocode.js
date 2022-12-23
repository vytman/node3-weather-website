const request = require('request');

const geocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=pk.eyJ1Ijoidnl0bWFuIiwiYSI6ImNsYnZhMWVsZTBvN2Mzb3QweXc4c3pzc3AifQ.kKDuLTzydYSUGCnxMO_1AA&limit=1';

	request({ url, json: true }, (error, { body }) => {
		const { features } = body;
		if (error) {
			callback('Unable to connect to location service!', undefined);
		} else if (!features.length) {
			callback('Unable to find location. Try another search', undefined);
		} else {
			const { center, place_name } = features[0];
			callback(undefined, {
				latitude: center[1],
				longitude: center[0],
				location: place_name,
			});
		}
	});
};

module.exports = geocode;
