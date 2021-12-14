require("dotenv").config();
const { Genre, Videogame } = require("../src/db");
const { genres } = require("./api.service");

const getDBGames = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};
const gameBD = (id) => {
  return Videogame.findByPk(id, {
    include: [
      {
        model: Genre,
        through: {
          // esto es para hacer validaciones
          attributes: [],
        },
      },
    ],
  });
};

const putGenresInDB = async () => {
  const genEach = await genres();
  genEach.forEach((ele) => {
    Genre.findOrCreate({
      where: { name: ele },
    });
  });
};

const videogameCreated = (
  name,
  description,
  released,
  background_image,
  rating,
  platforms,
  createdInDb
) =>
  Videogame.create({
    name,
    description,
    released,
    background_image,
    rating,
    platforms,
    createdInDb,
  });

const generoDb = (genre) => Genre.findAll({ where: { name: genre } });

const createdVideogame = (
  name,
  description,
  released,
  background_image,
  rating,
  platforms,
  createdInDb,
  genre
) => {
  Promise.all([
    videogameCreated(
      name,
      description,
      released,
      background_image,
      rating,
      platforms,
      createdInDb
    ),
    generoDb(genre),
  ]).then(([result1, result2]) => {
    result1.addGenre(result2);
    console.log("done");
  });
  // videogameCreated.addGenre(generoDb);
};
module.exports = {
  getDBGames,
  gameBD,
  putGenresInDB,
  createdVideogame,
};
// hasta aqui
