const express = require('express');
const data = require('./data.json');
const path = require('path');
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});







//local host listener
app.listen(3000, () => {
    console.log('Server listening on port 3000');
  })