import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGameDetail , upDate , clearDetail} from "../actions/index";
import  s from "../styles/Loading.module.css"

export default function DetailGame() {
  const params = useParams().id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameDetail(params));
    return()=>{
      dispatch(upDate())
      dispatch(clearDetail())
    }
  }, [params, dispatch]);

  const myGame = useSelector((state) => state.detail);
  return (
    <div>
      {myGame.length > 0 ? (
        <div>
          <h1>{myGame[0].name}</h1>
          <img
            src={myGame[0].background_image}
            alt={`Imagen del videojuego${myGame[0].name}`}
          ></img>
          {myGame[0].genres.map((g) => {
            return <div key={g.name}>{g.name}</div>;
          })}
          <div dangerouslySetInnerHTML={{ __html: myGame[0].description }} />
          <p>Rating : {myGame[0].rating}</p>
          {myGame[0].id.toString().includes("-")
            ? myGame[0].platforms.map((e, i) => {
                return <div key={e}>{e}</div>;
              })
            : myGame[0].platforms.map((e) => {
                return <div key={e.platforms}>{e.platforms}</div>;
              })}
          <Link to="/Home">
            <button>Volver</button>
          </Link>
        </div>
      ) : (
        
        <div>
          <div className= {s.loading}></div>
          <h3>Loading...</h3>
        </div>
        
        
      )}

    </div>
  );
}
