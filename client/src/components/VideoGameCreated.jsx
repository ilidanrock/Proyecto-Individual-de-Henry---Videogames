import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postVideogame, getAllGenres , upDate} from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { FcCheckmark } from "react-icons/fc";

export default function VideoGameCreated() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const AllGames = useSelector((state) => state.allVideoGames);
  const history = useNavigate();

  const plataforms_raw = AllGames.map((el) =>
    el.platforms.map((plat) => {
      return plat.name;
    })
  ).flat(Infinity);

  const platforms_filtered = plataforms_raw
    .filter((valor, indice) => {
      return plataforms_raw.indexOf(valor) === indice;
    })
    .slice(0, 8);

  const date = new Date();

  const today = `${date.getUTCFullYear()}-${date.getMonth() + 1}-${
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  }`;

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    background_image: "",
    isTrueValue: false,
    platforms: [],
    genre: [],
  });

  const urlPatternValidation = (URL) => {
    const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg))/);
    return regex.test(URL);
  };

  const changeUrl = (event) => {
    const { value } = event.target;
    const isTrueValue = !value || urlPatternValidation(value);
    setInput({
      ...input,
      background_image: value,
      isTrueValue,
    });
  };

  const disabledSummit = useMemo(() => {
    if (
      input.name.length > 0 &&
      input.description.length > 0 &&
      input.platforms.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  }, [input]);

  useEffect(() => {
    dispatch(getAllGenres());
    return () => {
      dispatch(upDate())
    }
  }, [dispatch]);

  //esta funcion es para guardar las cosas que el usuario esta escribiendo en el input en mi estado
  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleCheckGenre(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        genre: input.genre.concat(e.target.name),
      });
    } else {
      setInput({
        ...input,
        genre: input.genre.filter((prev) => prev !== e.target.value),
      });
    }
  }

  function handleCheckPlatforms(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        platforms: input.platforms.concat(e.target.name),
      });
    } else {
      setInput({
        ...input,
        platforms: input.platforms.filter((prev) => prev !== e.target.name),
      });
    }
  }

  function handlerSummit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postVideogame(input));
    alert("Videogame creado");
    setInput({
      name: "",
      description: "",
      released: "",
      rating: 0,
      background_image: "",
      platforms: [],
      genre: [],
    });
    history("/home");
  }
  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu videogame</h1>
      <form onSubmit={handlerSummit}>
        <div>
          <label>Nombre:</label>
          <input
            name="name"
            placeholder="Nombre del videojuego"
            type="text"
            value={input.name}
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                return handleChange(e);
              }
            }}
            autoComplete="off"
          />
          <span>{input.name.length} de 30 caracteres.</span>
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            placeholder="Escribe la descripcion..."
            type="text"
            value={input.description}
            onChange={(e) => {
              if (e.target.value.length <= 5000) {
                return handleChange(e);
              }
            }}
          />
        </div>
        <span>{input.description.length} de 5000 caracteres.</span>
        <div>
          <label>Fecha de lanzamiento:</label>
          <input
            name="released"
            type="date"
            value={input.released}
            onChange={handleChange}
            max={today}
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            name="rating"
            type="range"
            value={input.rating}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.01"
          />
          <span>{input.rating}</span>
        </div>
        <div>
          <label>Imagen:</label>
          <input
            name="background_image"
            placeholder="URL de la imagen"
            type="text"
            value={input.background_image}
            onChange={changeUrl}
            autoComplete="off"
          />
        </div>
        {input.isTrueValue === false && (
          <div style={{ color: "#F61C04" }}>URL no es valida.</div>
        )}
        {input.isTrueValue === true && input.background_image.length > 0 && (
          <div style={{ color: "#248dbf" }}>
            {" "}
            <FcCheckmark />{" "}
          </div>
        )}
        <div>
          <label>Generos:</label>
          {genres?.map((el) => {
            return (
              <label>
                <input
                  type="checkbox"
                  key={parseInt(el.name)}
                  name={el.name}
                  value={input.genre}
                  onChange={handleCheckGenre}
                />
                {el.name}
              </label>
            );
          })}
        </div>
        <div>
          <label>Plataformas:</label>
          {platforms_filtered?.map((el, i) => {
            return (
              <label>
                <input
                  type="checkbox"
                  name={el}
                  key={el}
                  value={input.platforms}
                  onChange={handleCheckPlatforms}
                />
                {el}
              </label>
            );
          })}
        </div>
        <button type="submit" disabled={disabledSummit}>
          Enviar
        </button>
      </form>
    </div>
  );
}
