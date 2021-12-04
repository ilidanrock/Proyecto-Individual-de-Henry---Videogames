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


  const pages = [`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`];

  for (let i = 0; i < 3; i++) {
    const resp = await axios.get(`${pages[i]}`);
    pages.push(resp.data.next);
      //Por cada iteracion
    let gamesFromApi = resp.data.results.map((game) => {
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

    apiInfo = apiInfo.concat(gamesFromApi);
  }
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

router.get("/videogames", async (req, res, next) => {
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
});

//----------------------------

// --------------------------Busqueda por ID----------

router.get("/videogame/:id", async (req, res, next) => {

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
        genres: data.genres.map((ele) => {
          return { name: ele.name };
        }),
        platforms: data.platforms.map((ele) => {
          return { platforms: ele.platform.name };
        }),
      };
      return res.status(200).json(game);
    } catch (error) {
      console.log("error en la ruta en el pedido al api ");
      next(error);
    }
  }
});

//------------------

//------------------Busqueda de los generos

router.get("/genres", async (req, res, next) => {
  try {
    const genresApi = await axios(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genEach = genresApi.data.results.map((ele) => ele.name);
    genEach.forEach((ele) => {
      Genre.findOrCreate({
        where: { name: ele },
      });
    });

    const allGenres = await Genre.findAll();
    res.send(allGenres);
  } catch (error) {
    next(error);
  }
});

router.post("/videogame", async (req, res, next) => {
  let {
    name,
    description,
    released,
    background_image,
    platforms,
    genre,
    createdInDb,
  } = req.body;

  let rating = parseInt(req.body.rating)
  console.log('este es el tipo rating',rating)

  try {
    let videogameCreated = await Videogame.create({
      name,
      description,
      released,
      background_image,
      rating,
      platforms,
      createdInDb,
    });
    let generoDb = await Genre.findAll({
      where: { name: genre },
    });
    videogameCreated.addGenre(generoDb);
    res.send("Videogame created");

    // let [generoDb , created] = await Genre.findOrCreate(
    //   {where :{ name : genre}}
    // );
    // videogameCreated.addGenre(generoDb);

    // res.send("Videogame created");
    // let genero= []
    // genre.forEach( async ele => {
    //    genero.push( awaitGenre.findOrCreate({
    //       where: {name: ele}
    //   }));
    //   videogameCreated.addGenre(genero);
    // });
    // return res.send('Game created');
  } catch (error) {
    next(error);
  }
});

//------------------

module.exports = router;
