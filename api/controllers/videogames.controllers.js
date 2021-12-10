const { getApiGames, gameAPI } = require("../services/api.service");
const {
  getDBGames,
  gameBD,
  putGenresInDB,
  createdVideogame,
} = require("../services/db.service");
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
      let gameName = gamesTotal
        .filter((el) => el.name.toLowerCase().includes(name.toLowerCase()))
        .slice(0, 15);
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

const getVideogameByID = (req, res, next) => {
  const id = req.params.id;
  if (id.includes("-")) {
    try {
      gameBD(id).then((game) => res.status(200).json(game));
      // console.log("este es el videogame de la base de datos",game);
      // return res.status(200).json(game);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      gameAPI(id)
        .then((apiUrl) => {
          const data = apiUrl.data;
          let game = {
            id: data.id,
            name: data.name,
            description: data.description,
            released: data.released,
            background_image: data.background_image,
            rating: data.rating,
            genres: data.genres.map((ele) => {
              return { name: ele.name };
            }),
            platforms: data.platforms.map((ele) => {
              return { platforms: ele.platform.name };
            }),
          };
          return game;
        })
        .then((game) => res.status(200).json(game));
      // return res.status(200).json(game);
    } catch (error) {
      console.log("error en la ruta en el pedido al api ");
      next(error);
    }
  }
};

const allGenres = async (req, res, next) => {
  try {
    putGenresInDB();
    const allGenres = await Genre.findAll();
    res.send(allGenres);
  } catch (error) {
    next(error);
  }
};

const postGame = (req, res, next) => {
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

    let rating = parseFloat(req.body.rating);
    console.log("este es el tipo rating", rating);

    createdVideogame(
      name,
      description,
      released,
      background_image,
      rating,
      platforms,
      createdInDb,
      genre
    );

    res.send("Videogame created");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVideoGames,
  getVideogameByID,
  allGenres,
  postGame,
};
