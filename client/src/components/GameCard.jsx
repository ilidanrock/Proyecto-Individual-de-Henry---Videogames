import React from "react";
import { Link } from "react-router-dom";
import s from "../styles/GameCard.module.css"



export default function GameCard({ name, background_image, genres,id,rating}) {
  return (
    <div className={s.card}>
      
      <Link to={`/videogame/${id}`} className={s.title}>
        <h3 >{name}</h3>
        <img src={background_image} alt="" width='150px' height='150px'/>
      </Link>
      <div>
        <h3>Generos:</h3>
        <div className={s.generos}>
        {genres?.map((g) => {return <div key={g.name}>{g.name} </div>})}
        </div>
      </div>
      <div>
        Rating: {rating}
      </div>
      
    </div>
  );
}
