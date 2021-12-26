import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGameDetail, upDate, clearDetail } from "../actions/index";
import s from "../styles/Loading.module.css";
import s1 from "../styles/DetailGame.module.css";
import btn from "../styles/AllGames.module.css";

export default function DetailGame() {
  const params = useParams().id;
  const myGame = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameDetail(params));
    return () => {
      dispatch(upDate());
      dispatch(clearDetail());
    };
  }, [params, dispatch]);

  // function scrollToTop() {
  //   window.scrollTo(0,0)
  // }
    
  return (
    <div className={s1.container}>
      {myGame.length > 0 ? (
        <div className={s1.cardDetail}>
          <h1>{myGame[0].name}</h1>
          <img
            src={myGame[0].background_image}
            alt={`Imagen del videojuego${myGame[0].name}`}
          ></img>
          <div>
            {" "}
            <h2>Generos:</h2>
            <div className={s1.generos}>
              {myGame[0].genres?.map((g) => {
                return <div key={g.name}>{g.name}</div>;
              })}
            </div>
          </div>
          <h2>Descripcion:</h2>
          <div
            className={s1.descripcion}
            dangerouslySetInnerHTML={{ __html: myGame[0].description }}
          />
          <h2>Rating : </h2> <p className={s1.rating}> {myGame[0].rating}</p>
          <h2>Plataformas: </h2>
          <div className={s1.generos}>
            {myGame[0].id.toString().includes("-")
              ? myGame[0].platforms.map((e) => {
                  return <div key={e}>{e}</div>;
                })
              : myGame[0].platforms.map((e) => {
                  return <div key={e.platforms}>{e.platforms}</div>;
                })}
          </div>
          <div>
            <h2>Fecha de lanzamiento: </h2>
            <p>{myGame[0].released}</p>
          </div>
          <Link to="/Home">
            <button className={btn.refresh}>Volver</button>
          </Link>
        </div>
      ) : (
        <div className={s.loading}>
          <h3>Loading</h3>
        </div>
      )}
    </div>
  );
}
