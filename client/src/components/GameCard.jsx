import React from "react";
import { Link } from "react-router-dom";
import s from "../styles/GameCard.module.css";

export default function GameCard({
  name,
  background_image,
  genres,
  id,
  rating,
}) {
  return (
    <div className={s.card}>
      <Link to={`/videogame/${id}`} className={s.title}>
        <h3>{name}</h3>
        <img src={background_image} alt="" width="200px" height="200px" />
      </Link>
      <div>
        <div className={s.titlesGenRa}>
          <h3 >Generos:</h3>
          <div className={s.generos}>
            {genres?.map((g) => {
              return <div className={s.genero} key={g.name}>{g.name} </div>;
            })}
        </div>
        </div>
        <div className={s.titlesGenRa}  >
          <h3>Rating: </h3>
          <div >{rating}</div>
        </div>
      </div>
    </div>
  );
}
