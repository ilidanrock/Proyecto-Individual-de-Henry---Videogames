import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideogames, getAllGenres, upDate } from "../actions";
import GameCard from "./GameCard";
import Paginado from "./Paginado";

import errorLog from "../assets/error1.jpg";
import style from "../styles/Loading.module.css";
import s from "../styles/AllGames.module.css";
import Navbar from "./Navbar";

export default function AllGames() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);

  const nogameget = useSelector((state) => state.nogameget);
  const infoGetted = useSelector((state) => state.infoGetted);
  const [orden, setOrden] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [videoGamesPerPage] = useState(15);
  const indexOfLast = currentPage * videoGamesPerPage;
  const indexOffirst = indexOfLast - videoGamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOffirst,
    indexOfLast
  );

  //1-----15

  const paginado = (pageNumber) => {
    setcurrentPage(pageNumber);
  };
  function handleonChargeGames(e) {
    e.preventDefault();
    dispatch(getVideogames());
    dispatch(upDate());
  }


  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <div>
      <Navbar
        orden={orden}
        setcurrentPage={setcurrentPage}
        setOrden={setOrden}
      />

      <Paginado
        videoGamesPerPage={videoGamesPerPage}
        allVideogames={allVideogames.length}
        paginado={paginado}
      ></Paginado>
      <button
        onClick={(e) => {
          handleonChargeGames(e);
        }}
        className={s.refresh}
        style={{ margin: "3rem 0" }}
      >
        Refresh
      </button>
      <div>
        {!infoGetted && (
          <div className={style.loading}>
            <h3 style={{ color: "#f1f1f1", fontSize: "3rem" }}>Loading...</h3>
          </div>
        )}
      </div>
      <div className={s.gripcards}>
        {infoGetted &&
          currentVideogames?.map((ele, s) => {
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
          })}
      </div>
      <div hidden={!nogameget}>
        <img
          src={errorLog}
          alt="No se encontraron coincidencias en la busqueda"
          width="100px"
        />
        <h3 style={{ margin: "0 0 2rem 0", color: "#F1f1f1f1" }}>
          No hay coincidencias en tu busqueda.
        </h3>
      </div>
    </div>
  );
}
