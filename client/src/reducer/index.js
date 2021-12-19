//Segundo archivo a trabajar
const initialState = {
  allVideoGames: [],
  videogames: [],
  genres: [],
  detail: [],
  infoGetted: false,
  nogameget: false,
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_GAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideoGames: action.payload,
        infoGetted: true,
      };
    case "GET_ALL_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "FILTER_CREATED":
      const allGame = state.allVideoGames;
      const createdFilter =
        action.payload === "created"
          ? allGame.filter((el) => el.createdInDb === true)
          : action.payload === "all"
          ? allGame
          : allGame.filter((el) => el.createdInDb === false);
      return {
        ...state,
        videogames: createdFilter
      };

    case "FILTER_BY_GENRE":
      const allGames = state.allVideoGames;
      const genresFiltered =
        action.payload === "all"
          ? allGames
          : allGames.filter((el) =>
              el.genres.some((ele) => ele.name === action.payload)
            );
      return {
        ...state,
        videogames: genresFiltered,
      };

    case "ORDER_BY_RATING":
      const sortedRating =
        action.payload === "asc"
          ? state.videogames.sort((a, b) => {
              if (a.rating > b.rating) {
                return 1;
              }
              if (a.rating < b.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.rating > b.rating) {
                return -1;
              }
              if (a.rating < b.rating) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        videogames: sortedRating,
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.videogames.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        videogames: sortedArr,
      };
    case "GET_GAMES_BY_NAME":
      console.log(action.payload);
      return {
        ...state,
        videogames: action.payload,
        nogameget: false,
        infoGetted: true,
      };
    case "POST_CHARACTER": // posiblemente este de mas
      return {
        ...state,
      };
    case "GET_DETAIL_GAME":
      return {
        ...state,
        detail: [action.payload],
      };
    case "CLEAR_DETAIL":
      return {
        ...state,
        detail: [],
      };
    case "UPDATE_INFO":
      return {
        ...state,
        infoGetted: false,
        nogameget: false,
      };
    case "NO_FOUND_GAME":
      return {
        ...state,
        videogames: action.payload,
        nogameget: true,
        infoGetted: true,
      };
    default:
      return state;
  }
}

export default rootReducer;
