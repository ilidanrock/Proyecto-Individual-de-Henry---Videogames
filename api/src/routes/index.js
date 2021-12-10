const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Genre, Videogame } = require("../db");

const router = Router();

const{ getVideoGames , getVideogameByID , allGenres , postGame} = require("../../controllers/videogames.controllers")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// --------------------------Busqueda de videogames en la ruta principal y por query----------

router.route("/videogames").get(getVideoGames);

// --------------------------Busqueda por ID----------
router.route("/videogame/:id").get(getVideogameByID);

//------------------Busqueda de los generos
router.route("/genres").get(allGenres);

//----------Ruta de post
router.route("/videogame").post(postGame);

module.exports = router;
