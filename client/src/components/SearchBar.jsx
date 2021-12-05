import React from "react";
import { useState } from "react";
import { getVideoGamebyName , upDate } from "../actions";
import {  useDispatch } from "react-redux";


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
    <div>
      <input
        type="text"
        placeholder="Buscar videogame"
        onChange={(e) => {
          handleInputChange(e);
        }}
        id="search-bar-input"
      />
      <button type="submit" onClick={(e) => handlerSummit(e)}>
        Buscar
      </button>
    </div>
  );
}
