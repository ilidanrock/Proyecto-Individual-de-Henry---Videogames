import React, {  useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getVideogames,
  filterVideogamesbyGenre,
  getAllGenres,
  filterCreated,
  orderByName,
  orderByRating,
} from "../actions";
import { Link } from "react-router-dom";
import GameCard from "./GameCard";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import ClipLoader from "react-spinners/ClipLoader";

export default function AllGames() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);
  const infoGetted = useSelector((state) => state.infoGetted)

  const [orden, setOrden] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [videoGamesPerPage] = useState(15);
  const indexOfLastVideogamePlusOne = currentPage * videoGamesPerPage;
  const indexOffirstVideogame = indexOfLastVideogamePlusOne - videoGamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOffirstVideogame,
    indexOfLastVideogamePlusOne
  );

  //1-----15

  const paginado = (pageNumber) => {
    setcurrentPage(pageNumber);
  };

  useEffect(() => {
    
    dispatch(getAllGenres());
    dispatch(getVideogames());
 
  },[dispatch]);



  function handleonChargeGames(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  function handleFilteredbyGenre(e) {
    dispatch(filterVideogamesbyGenre(e.target.value));
  }

  function handlefilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setcurrentPage(1);
    setOrden(`Orden ${e.target.value}`);
  }

  function sortByRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setcurrentPage(1);
    setOrden(`Orden ${e.target.value}`);
  }

  return (
    <div>
      <h1>Video games!</h1>
      <Link to="/videogame">Crear videogame</Link>
      <button
        onClick={(e) => {
          handleonChargeGames(e);
        }}
      >
        Cargar los videojuegos completos.
      </button>
      <div>
        <h4>{orden}</h4>
        <select
          onChange={(e) => {
            handleSort(e);
          }}
        >
          <option value="asc">Ascendente A-Z</option>
          <option value="desc">Descendente Z-A</option>
        </select>
        <select
          onChange={(e) => {
            sortByRating(e);
          }}
        >
          <option value="asc">Rating 1 -10 </option>
          <option value="desc">Rating 10 - 1</option>
        </select>
        <select onChange={(e) => handlefilterCreated(e)}>
          <option value="all">Todos</option>
          <option value="created">Creados</option>
          <option value="api">API</option>
        </select>
        <select onChange={(e) => handleFilteredbyGenre(e)}>
          <option value="all">Todos</option>
          {allGenres?.map((ele) => {
            return (
              <option key={ele.id} value={ele.name}>
                {ele.name}
              </option>
            );
          })}
        </select>

        <SearchBar />

        <Paginado
          videoGamesPerPage={videoGamesPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
        ></Paginado>
        {
          !infoGetted?
          <ClipLoader color={"#36d7b7"} size={150} />
          : currentVideogames?.map((ele) => {
            return (
              <GameCard
                key={ele.id}
                id={ele.id}
                name={ele.name}
                background_image={ele.background_image}
                genres={ele.genres}
                rating={ele.rating}
              />
            );
          }) 
        }
      </div>
    </div>
  );
}
