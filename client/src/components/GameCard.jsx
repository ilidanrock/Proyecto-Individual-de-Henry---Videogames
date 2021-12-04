import React from "react";
import { Link } from "react-router-dom";

export default function GameCard({ name, background_image, genres,id,rating}) {
  return (
    <div>
      <Link to={`/videogame/${id}`}><h3>{name}</h3></Link>
      
      <img src={background_image} alt="" width='200px' height='250px'/>
      <div>
        Generos:
        {genres?.map((g) => {return <div key={g.name}>{g.name} </div>})}
      </div>
      <div>
        Rating: {rating}
      </div>
    </div>
  );
}
