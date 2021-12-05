import React from "react"; 
import {Link} from "react-router-dom";
import '../styles/LandingPage.css'

export default function Landing () {
    return (
    <div className="landing">
        <h1 className="mensaje">Bienvenidos!</h1>
        <Link to = '/Home' className="link">
            <button className="boton" >Ingresar</button>
        </Link>
    </div>
    )
}

