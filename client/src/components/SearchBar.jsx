import React from "react";
import { useState } from "react";
import { getVideoGamebyName , upDate } from "../actions";
import {  useDispatch } from "react-redux";
import s from "../styles/Search.module.css"
import allgames from "../styles/AllGames.module.css"

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handlerSummit(e) {
    e.preventDefault();
    dispatch(upDate());
    dispatch(getVideoGamebyName(name));
    setName(e.target.value);
    const input = document.getElementById("search-bar-input");
    input.value = "";
  }

  return (
    <div className={s.divSearch}>
      <input className={s.search}
        type="text"
        placeholder="Busqueda..."
        onChange={(e) => {
          handleInputChange(e);
        }}
        id="search-bar-input"
      />
      <button className={allgames.refresh} type="submit" onClick={(e) => handlerSummit(e)}>
        Buscar
      </button>
    </div>
  );
}
