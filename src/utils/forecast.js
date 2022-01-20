const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=857512d3a4fab108ead5d791881f5841&query=${longitude},${latitude}`;

  request(url, { json: true }, (error, response) => {
    const { error: responseError, current: currentData } = response.body;
    if (error) {
      callback('Unable to connect to weather services.');
    } else if (responseError) {
      callback(
        `Error occured. Code: ${responseError.code}. Message: ${responseError.info}`
      );
    } else {
      callback(
        undefined,
        `The weather is ${currentData.weather_descriptions} now. Temperature is ${currentData.temperature} degrees.`
      );
    }
  });
};

module.exports = forecast;
