import React from "react";
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
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((n) => {
            return (
              <li key={n}>
                <button onClick={() => paginado(n)} >{n}</button>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
