require("dotenv").config();
const { API_KEY } = process.env;

const axios = require("axios");

const getApiGames =  async () => {
  const promises = [
    axios(`https://api.rawg.io/api/games?key=${API_KEY}`),
    axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
    axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
    axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
    axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`),
  ];

  let gamesAPI = await Promise.all(promises);
  gamesAPI = gamesAPI.map((el) => el.data.results);
  gamesAPI = gamesAPI.flat().map((game) => {
    return {
      id: game.id,
      name: game.name,
      rating: game.rating,
      background_image: game.background_image,
      genres: game.genres.map((ele) => {
        return { name: ele.name };
      }),
      platforms: game.platforms.map((ele) => {
        return { name: ele.platform.name };
      }),
      createdInDb: false,
    };
  });
  return gamesAPI;
};

const gameAPI = (id) => {
  return axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
};

//genres pide la informacion del API externa
const genres = async () => {
  const genresApi = await axios(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  const genEach = genresApi.data.results.map((ele) => ele.name);
  return genEach;
};

module.exports = {
  getApiGames,
  gameAPI,
  genres,
};
