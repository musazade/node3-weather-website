const path = require('path');

const hbs = require('hbs');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDirectoryPath));

// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    tag: '@musazzadeh',
    name: 'Elnur Musazade',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Elnur Musazade',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    number: '+994518405533',
    title: 'Help',
    name: 'Elnur Musazade',
  });
});

app.get('/weather', (req, res) => {
  let address = req.query.address;
  if (!address)
    return res.send({
      error: 'You must provide an address',
    });

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });

    forecast(longitude, latitude, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });

});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'help Error',
    message: "Couldn't find help topic",
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'common Error',
    message: "Couldn't find the requested page",
  });
});

app.listen(3000, () => {
  console.log('Application is running on port 3000');
});
