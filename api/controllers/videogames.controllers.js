const { getApiGames, gameAPI } = require("../services/api.service");
const { getDBGames , gameBD , putGenresInDB , createdVideogame } = require("../services/db.service");
const { Genre } = require("../src/db");

const getAllGames = async () => {
  const apiInfo = await getApiGames();
  const dbInfo = await getDBGames();
  const infoAll = apiInfo.concat(dbInfo);
  return infoAll;
};

const getVideoGames = async (req, res, next) => {
  try {
    const { name } = req.query;
    let gamesTotal = await getAllGames();
    if (name) {
      let gameName = gamesTotal.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      gameName.length
        ? res.send(gameName).status(200)
        : res.send([]).status(400); //rompe aqui
    } else {
      res.status(200).send(gamesTotal);
    }
    //console.log(gamesTotal.length)
  } catch (error) {
    next(error);
  }
};


const getVideogameByID =  async (req, res, next) => {
    const id = req.params.id;
    console.log(typeof id);
    if (id.includes("-")) {
      try {
        const game = await gameBD(id)
        console.log(game);
        return res.status(200).json(game);
      } catch (error) {
        next(error);
      }
    } else {
      try {
        const game = await gameAPI(id);
        return res.status(200).json(game);
      } catch (error) {
        console.log("error en la ruta en el pedido al api ");
        next(error);
      }
    }
  };

const allGenres = async (req, res, next) => {
    try {
        putGenresInDB()
        const allGenres = await Genre.findAll();
        res.send(allGenres);
      } catch (error) {
        next(error);
      }
}

const postGame = async (req , res ,next ) => {
    try {

    let {
    name,
    description,
    released,
    background_image,
    platforms,
    genre,
    createdInDb,
    } = req.body;

    let rating = parseFloat(req.body.rating)
    console.log('este es el tipo rating',rating)

    createdVideogame(name,description,released,
    background_image,
    rating,
    platforms,
    createdInDb,genre)
    
    res.send("Videogame created");

    } catch (error) {
    next(error);
    }

    
}

module.exports = {
  getVideoGames,
  getVideogameByID,
  allGenres,
  postGame,
};
