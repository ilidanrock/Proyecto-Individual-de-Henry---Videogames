import React , { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  filterCreated,
  filterVideogamesbyGenre,
  orderByName,
  orderByRating,
} from "../actions";
import SearchBar from "./SearchBar";
import s from "../styles/Navbar.module.css";
import allgames from "../styles/AllGames.module.css"

export default function Navbar({  setcurrentPage, setOrden }) {
  const allGenres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const infoGetted = useSelector((state) => state.infoGetted);

  const [display, setDisplay] = useState('')

  function handlefilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    setcurrentPage(1);
  }

  function handleFilteredbyGenre(e) {
    dispatch(filterVideogamesbyGenre(e.target.value));
    setcurrentPage(1);
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
 
  
  function LaboratoriaDoggies() {
    display === 'flex'? setDisplay(''): setDisplay('flex')
  }

  return (
    <div className={s.navbar}>
      <dir className={s.menu}>
        <div className={s.links} style={{ display:`${display}`}}>
          <ul>
            <select
              className={s.order}
              disabled={!infoGetted}
              onChange={(e) => {
                handleSort(e);
              }}
            >
              <option value="asc">Ascendente A-Z</option>
              <option value="desc">Descendente Z-A</option>
            </select>
            <select
              className={s.order}
              disabled={!infoGetted}
              onChange={(e) => {
                sortByRating(e);
              }}
            >
              <option value="asc">Rating 0 - 5 </option>
              <option value="desc">Rating 5 - 0</option>
            </select>
            <select
              onChange={(e) => handlefilterCreated(e)}
              disabled={!infoGetted}
              className={s.order}
            >
              <option value="all">Todos</option>
              <option value="created">Creados</option>
              <option value="api">API</option>
            </select>
            <select
              onChange={(e) => handleFilteredbyGenre(e)}
              disabled={!infoGetted}
              className={s.orderGeneros} 
            >
              <option value="all">Generos</option>
              {allGenres?.map((ele) => {
                return (
                  <option key={ele.id} value={ele.name}  >
                    {ele.name} 
                  </option>
                );
              })}
            </select>
            <Link className={allgames.refresh} to="/videogame"><p>Crea tu videogame.</p></Link>
          </ul>
        </div>
        <div>
          <button onClick={()=>LaboratoriaDoggies()} className={s.toogleButtom} >
            <span className={s.bar}></span>
            <span className={s.bar}></span>
            <span className={s.bar}></span>
          </button>
        </div>
        <div className={s.searchCreate}>
          <SearchBar className={s.search} />
        </div>
      </dir>
    </div>
  );
}
