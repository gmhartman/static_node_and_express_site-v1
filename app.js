const e = require('express');
const express = require('express');
const data = require('./data.json').projects;
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

app.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const project = data.find( ({ id }) => id === +projectId);
    res.render('project', {project});
});

//error handlers

app.use((req, res, next) => {
    console.log('404 error handler called');
    const err = new Error('Error 404');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    if (err.status >= 100 && err.status < 600) {
        res.status(err.status);
        res.render('page-not-found', {err});
        console.log('Error Ocurred');
    } else {
        err.status = 500;
        console.log('Error ocurred');
        res.render('error', {err, req});
    }
});

//local host listener
app.listen(3000, () => {
    console.log('Server listening on port 3000');
  })