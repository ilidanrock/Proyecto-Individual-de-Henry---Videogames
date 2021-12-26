import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  postVideogame,
  getAllGenres,
  upDate,
  getVideogames,
} from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import s from "../styles/VideoGameCreated.module.css";
import s1 from "../styles/AllGames.module.css";

export default function VideoGameCreated() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const AllGames = useSelector((state) => state.allVideoGames);
  const history = useNavigate();

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


  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getVideogames());
    return () => {
      dispatch(upDate());
    };
  }, [dispatch]);

  //-----Aqui recibo las plataformas del estado de Redux y las filtro para poder usarlas en el select y el checkbox

  const plataforms_raw = AllGames?.map((el) =>
    el.platforms.map((plat) => {
      return plat.name;
    })
  ).flat(Infinity);
  const platforms_filtered = plataforms_raw.reduce((acc, item) => {
    if (!acc.includes(item) && item !== undefined) {
      acc.push(item);
    }
    return acc;
  }, []);

  
  //---------------------------------------------------------------------

  //----------Validacion de la URL de la imagen---------

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

  //-Validacion del calendario---------------------

  const isValidDate = (dateString) => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false; // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === dateString;
  };

  //Deshabilitacion del boton de enviar.

  const disabledSummit = useMemo(() => {
    if (
      input.name.length > 0 &&
      input.description.length > 0 &&
      input.platforms.length > 0 &&
      isValidDate(input.released) &&
      input.rating < 5 &&
      typeof parseFloat(input.rating) === "number" &&
      input.isTrueValue &&
      input.genre.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  }, [input]);
  //---------------------------------------------------------

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

  // function handleCheckPlatforms(e) {
  //   if (e.target.checked) {
  //     setInput({
  //       ...input,
  //       platforms: input.platforms.concat(e.target.name),
  //     });
  //   } else {
  //     setInput({
  //       ...input,
  //       platforms: input.platforms.filter((prev) => prev !== e.target.name),
  //     });
  //   }
  // }

  //Handles

  function handleSelectPlatforms(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  }

  function handleDelete(el) {
    setInput({
      ...input,
      platforms: input.platforms.filter((plat) => plat !== el),
    });
  }

  function handlerSummit(e) {
    e.preventDefault();
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
    <div className={s.testbox}>
      <Link to="/home">
        <button className={s1.refresh}>Volver</button>
      </Link>
      <h1>Crea tu videogame</h1>
      <form onSubmit={handlerSummit}>
        <div>
          <label className={s.title} >Nombre:</label>
          <div className={s.nameAdvice}>
            <input
              className={s.inputForm}
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
            {input.name.length === 0 && (
              <span style={{ margin: "0 0 1rem 0", color: "#F61C04", textAlign: "right" }}>
                <h3>Escribe el nombre del videojuego.</h3>
              </span>
            )}
          </div>
        </div>
        <div>
          <label className={s.title}>Descripción:</label>
          <div className={s.describeAdvice}>
            <textarea
              className={s.inputForm}
              name="description"
              placeholder="Escribe la descripcion..."
              type="text"
              value={input.description}
              onChange={(e) => {
                if (e.target.value.length <= 5000) {
                  return handleChange(e);
                }
              }}
              rows="5"
            />
            <span>{input.description.length} de 5000 caracteres.</span>
            {!input.description.length > 0 && (
              <span style={{ margin: "0 0 1rem 0", color: "#F61C04", textAlign: "right" }}>
                <h3>Escribe la descripcion del videojuego.</h3>
              </span>
            )}
          </div>
        </div>

        <div>
          <label className={s.title}>Fecha de lanzamiento:</label>
          <input
            name="released"
            type="date"
            value={input.released}
            onChange={handleChange}
            className={s.inputForm}
          />
        </div>
        {!isValidDate(input.released) && (
          <div style={{ margin: "0 0 1rem 0", color: "#F61C04", textAlign: "right"  }}>
            <h3>Falta la fecha de lanzamiento.</h3>
          </div>
        )}
        <div>
          <label className={s.title}>Rating:</label>
          <div>
            <input
              name="rating"
              type="range"
              value={input.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.01"
              className={s.inputForm}
            />
            {typeof parseFloat(input.rating) === "number" &&
            parseFloat(input.rating) ? (
              <span>{input.rating}</span>
            ) : (
              <div style={{ margin: "0 0 1rem 0", color: "#F61C04", textAlign: "right"  }}>
                <h3>Debes colocar el rating.</h3>
              </div>
            )}
          </div>
        </div>
        <div className={s.title}>
          <label>Imagen:</label>
          <input
            name="background_image"
            placeholder="URL de la imagen"
            type="text"
            value={input.background_image}
            onChange={changeUrl}
            autoComplete="off"
            className={s.inputForm}
          />
        </div>
        {input.isTrueValue === false && (
          <div style={{ margin: "0 0 1rem 0", color: "#F61C04", textAlign: "right"  }}>
            <h3>URL no es valida.</h3>
          </div>
        )}
        {input.isTrueValue === true && input.background_image.length > 0 && (
          <div style={{ margin: "1rem", color: "#248dbf" }}><h3>URL valida.</h3></div>
        )}
        <div className={s.platforms}>
          <label className={s.title}>Plataformas:</label>
          {/* {platforms_filtered?.map((el, i) => {
            return (
              <label>
                <input
                  type="checkbox"
                  name={el}
                  key={el}
                  value={input.platforms}
                  onChange={handleCheckPlatforms}
                  className={s.inputForm}
                />
                {el}
              </label>
            );
          })} */}
          <select onChange={(e) => handleSelectPlatforms(e)}>
            <option key={1}>Plataformas</option>
            {platforms_filtered?.map((el) => {
              return (
                <option name={el} key={Math.random()} value={el} className={s.inputForm}>
                  {el}
                </option>
              );
            })}
          </select>
          {input.platforms.length === 0 && (
            <div style={{ margin: "0 0 1rem 0", color: "#F61C04", textAlign: "right" }}>
              <h3>Falta escoger las plataformas.</h3>
            </div>
          )}
        </div>

        <label className={s.title}>Generos:</label>
        <div className={s.generos}>
          {genres?.map((el) => {
            return (
              <div key={el.name} >
                <input 
                  key={el.name} 
                  type="checkbox"
                  name={el.name}
                  value={input.genre}
                  onChange={handleCheckGenre}
                />
                <div>{el.name}</div>
              </div>
            );
          })}
        </div>
        {input.genre.length === 0 && (
          <div style={{ margin: "0 0 1rem 0", color: "#F61C04", textAlign: "right" }}>
            <h3>Escoge al menos un genero.</h3>
          </div>
        )}
        <div className={s.btnBlock}>
          <button type="submit" disabled={disabledSummit}>
            Enviar
          </button>
          <span hidden={!disabledSummit} style={{ color: "#F61C04", textAlign: "right" }}>
          <h3>Los campos marcados en rojo son obligatorios.</h3>
          </span>
        </div>
      </form>
      <div>
        <ul className={s.selections}>
          {input.platforms.map((el) => (
            <div key={el} name={el} className={s.platform}>
              <h3>{el}</h3>
              <button onClick={() => handleDelete(el)}>x</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
