require("dotenv").config();
const { Genre, Videogame } = require("../src/db");
const { genres } = require("./api.service");

const getDBGames = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attibutes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};
const gameBD = async (id) => {
  return await Videogame.findByPk(id, {
    include: [
      {
        model: Genre,
        through: { // esto 
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

const createdVideogame = async (
  name,
  description,
  released,
  background_image,
  rating,
  platforms,
  createdInDb,
  genre
) => {
  let videogameCreated = await Videogame.create({
    name,
    description,
    released,
    background_image,
    rating,
    platforms,
    createdInDb,
  });
  let generoDb = await Genre.findAll({ where: { name: genre } });
  videogameCreated.addGenre(generoDb);
};
module.exports = {
  getDBGames,
  gameBD,
  putGenresInDB,
  createdVideogame,
};
