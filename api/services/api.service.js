require("dotenv").config();
const { API_KEY } = process.env;

const axios = require("axios");

const getApiGames = async () => {
  let apiInfo = [];

  const promises =[
    axios(`https://api.rawg.io/api/games?key=${API_KEY}`),
    axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
    axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
    axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
    axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`),
  ]

  let gamesAPI = await Promise.all(promises);
  gamesAPI = gamesAPI.map((el) => el.data.results)
  gamesAPI = gamesAPI.flat().map((game) => {
    return{
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
    }
  })
  // const pages = [`https://api.rawg.io/api/games?key=${API_KEY}`];

  // for (let i = 0; i < 5; i++) {
  //   const resp = await axios.get(`${pages[i]}`);
  //   pages.push(resp.data.next);
  //   //Por cada iteracion
  //   let gamesFromApi = resp.data.results.map((game) => {
  //     return {
  //       id: game.id,
  //       name: game.name,
  //       rating: game.rating,
  //       background_image: game.background_image,
  //       genres: game.genres.map((ele) => {
  //         return { name: ele.name };
  //       }),
  //       platforms: game.platforms.map((ele) => {
  //         return { name: ele.platform.name };
  //       }),
  //       createdInDb: false,
  //     };
  //   });

  //   apiInfo = apiInfo.concat(gamesFromApi);
  // }
  return gamesAPI;
};

const gameAPI = (id) => {

    return axios(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
  // const apiUrl = axios(
  //   `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
  // );

  // const data = apiUrl.data;

  // let game = {
  //   id: data.id,
  //   name: data.name,
  //   description: data.description,
  //   released: data.released,
  //   background_image: data.background_image,
  //   rating: data.rating,
  //   genres: data.genres.map((ele) => {
  //     return { name: ele.name };
  //   }),
  //   platforms: data.platforms.map((ele) => {
  //     return { platforms: ele.platform.name };
  //   }),
  // };

  // return game;
};

//genres pide la informacion del API externa 
const genres = async () => {
  const genresApi = await axios(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  const genEach = genresApi.data.results.map((ele) => ele.name);
  return genEach
};

module.exports = {
  getApiGames,
  gameAPI,
  genres,
};
