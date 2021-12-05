import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    try {
      var json = await axios(`http://localhost:3001/videogames`);
      dispatch({
        type: "GET_GAMES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllGenres() {
  return async function (dispatch) {
    try {
      var json = await axios(`http://localhost:3001/genres`);
      dispatch({
        type: "GET_ALL_GENRES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterVideogamesbyGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function getVideoGamebyName(payload) {
  return async function (dispatch) {
    try {
      var json = await axios(
        `http://localhost:3001/videogames?name=${payload}`
      );
      if (!json.data.length) {
        dispatch({
          type: "NO_FOUND_GAME",
          payload: json.data,
        })
      }else{ dispatch({
        
        type: "GET_GAMES_BY_NAME",
        payload: json.data,
      });
    }

    } catch (error) {
      console.log(error);

    }
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/videogame",
        payload
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export function getGameDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios(`http://localhost:3001/videogame/${id}`);
      dispatch({
        type: "GET_DETAIL_GAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      alert("Error obteniendo datos del videojuego", error);
    }
  };
}

export function clearDetail() {
  return {
    type: "CLEAR_DETAIL",
  };
}

export function upDate() {
    return{
        type:"UPDATE_INFO"
    }
}
