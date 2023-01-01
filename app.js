const e = require('express');
const express = require('express');
const data = require('./data.json').projects;
const path = require('path');
const app = express();


app.set('view engine', 'pug');
app.use('/static', express.static('public'));


app.get('/', (req, res) => {
    res.locals.projects = data;
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = data.find( ({ id }) => id === +projectId);
    if (project) {
        res.render('project', {project});
    } else {
        console.log('Error Ocurred');
        const err = new Error('Error');
        err.status = 500;
        err.message = `A server error has ocurred. Please try again.`
        next(err);
    }
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
    if (err.status === 404) {
        console.log('Error - Page Not Found');
        res.status(404).render('page-not-found', {err})
    } else {
        console.log('A server error has ocurred. Please try again.');
        err.message = err.message || `A server error has ocurred. Please try again.`;
        res.status(err.status || 500).render('error', {err});
    }
});

//local host listener
app.listen(3000, () => {
    console.log('Server listening on port 3000');
  })