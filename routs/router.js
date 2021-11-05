module.exports = app => {
    const controlador = require("../controllers/controller.js");

    var router = require("express").Router();

    router.get("/", controlador.fetchWebsitesData);

    app.use('https://cerveja.vercel.app/api/jola', router);
};