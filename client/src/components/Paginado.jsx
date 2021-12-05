import React from "react";
import "../styles/Paginado.css";
// este componente va a renderizar los numeros de la paginacion.
export default function Paginado({
  videoGamesPerPage,
  allVideogames,
  paginado,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videoGamesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
      <div className='container_pagination'>
      <ul className="pagination">
        {pageNumbers &&
          pageNumbers.map((n) => {
            return (
              <button key={n} className="btn" onClick={() => paginado(n)}>
                {n}
              </button>
            );
          })}
      </ul>
      </div>
  );
}
