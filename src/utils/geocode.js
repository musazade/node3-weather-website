const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    address +
    '.json?access_token=pk.eyJ1IjoibXVzYXphZGUiLCJhIjoiY2t3NmY0azJ2MWlkNzJ2cDZhM3lsOW16OCJ9.iHInelmo3ss9Tm9v0gJepw';

  request({url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        location: response.body.features[0].place_name,
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
      });
    }
  });
};

module.exports = geocode;
