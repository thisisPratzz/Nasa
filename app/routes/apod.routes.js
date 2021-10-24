const express = require("express");
const router = express.Router();
const apodController = require("../controllers/apod.controller");
const request = require('request');
let routes = (app) => {
  router.get("/image/:id", apodController.displayPicture);



  app.get("/google/logo", function(req, res) {
    var requestSettings = {
        url: 'https://apod.nasa.gov/apod/image/2107/sh2_101_04_1024.jpg',
        method: 'GET',
        encoding: null
    };
    console.log("statrted");
    request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
});
 app.use(router);
};

module.exports = routes;