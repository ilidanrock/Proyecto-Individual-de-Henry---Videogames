import React from "react"; 
import {Link} from "react-router-dom";
import s from '../styles/LandingPage.module.css'

export default function Landing () {
    return (
    <div className={s.landing}>
        <h1 className={s.mensaje}>Bienvenidos!</h1>
        <Link to = '/Home'>
            <button className={s.boton} >Ingresar</button>
        </Link>
    </div>
    )
}

