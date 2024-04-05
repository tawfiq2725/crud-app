const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    const locals = {
        title:'Crud APP'
    }
    res.render('index',{locals});
});

module.exports = routes;
