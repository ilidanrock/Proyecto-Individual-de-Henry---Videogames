import React from "react";
import s from "../styles/Paginado.module.css";
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
      <div className={s.containerPagination}>
      <ul className={s.pagination}>
        {pageNumbers &&
          pageNumbers.map((n) => {
            return (
              <button key={n} className={s.btn} onClick={() => paginado(n)}>
                {n}
              </button>
            );
          })}
      </ul>
      </div>
  );
}
