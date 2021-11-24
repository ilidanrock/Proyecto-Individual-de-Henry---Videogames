const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Genre, Videogame } = require("../db");
const { API_KEY } = process.env;
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// --------------------------Busqueda de videogames en la ruta principal y por query----------

const getApiGames = async () => {

  let apiInfo = [];

  const pages = [`https://api.rawg.io/api/games?key=${API_KEY}`];

  for (let i = 0; i < 5; i++) {
    const resp = await axios.get(`${pages[i]}`);
    pages.push(resp.data.next);

    let gamesFromApi = await resp.data.results.map((game) => {
      return{
        id: game.id,
        name: game.name,
        released: game.released,
        background_image: game.background_image,
        rating: game.rating,
        genres: game.genres.map((ele) => { return { name: ele.name }}),
        platforms: game.platforms.map((ele) => {return {platforms : ele.platform.name}}),
        created: false,
      };
    });

    apiInfo = apiInfo.concat(gamesFromApi);
  }
  // const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
  // const apiInfo = await apiUrl.data.results.map((obj) => {
  //   return {
  //     id: obj.id,
  //     name: obj.name,
  //     background_image: obj.background_image,
  //     genres: obj.genres.map((ele) => {
  //       return { name: ele.name };
  //     }),
  //   };
  // });
  return apiInfo;
};

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

const getAllGames = async () => {
  const apiInfo = await getApiGames();
  const dbInfo = await getDBGames();
  const infoAll = apiInfo.concat(dbInfo);
  return infoAll;
};



router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  let gamesTotal = await getAllGames();
  if (name) {
    let gameName = await gamesTotal.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()));
    gameName.length
      ? res.status(200).send(gameName)
      : res.status(400).send("This Videogame not exist");
  }
  res.status(200).send(gamesTotal)
});

//----------------------------

// --------------------------Busqueda por ID----------

router.get("/videogame/:id",async (req, res, next) => {
  console.log('por aqui');
  const id = req.params.id;
  console.log(id);
  if (id.includes("-")) {
    try {
      const game = await Videogame.findByPk(id, {
        include: [
          {
            model: Genre,
            through: {
              attributes: [],
            },
          },
        ],
      });
      return res.status(200).json(game);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const apiUrl = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      
      const data = apiUrl.data;
      
      let game = {
        id: data.id,
        name: data.name,
        description: data.description,
        released: data.released,
        background_image: data.background_image,
        rating: data.rating,
        genres: data.genres.map((ele) => { return { name: ele.name }}),
        platforms: data.platforms.map((ele) => {return {platforms : ele.platform.name}}),
      };
      return res.status(200).json(game);
    } catch (error) {
      next(error);
    }
  }
});

//------------------

//------------------Busqueda de los generos


router.get('/genres', async (req , res) => {
    const genresApi = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genEach =  genresApi.data.results.map((ele) => ele.name)
    genEach.forEach(ele => {
        Genre.findOrCreate({
            where :{name : ele}
        })
    });

    const allGenres = await Genre.findAll();
    res.send(allGenres)
})

//------------------

module.exports = router;
