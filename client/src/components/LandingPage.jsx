import React from "react"; 
import {Link} from "react-router-dom";

export default function Landing () {
    return (
    <div>
        <h1>Landing page</h1>
        <Link to = '/Home'>
            <button>Ingresar</button>
        </Link>
    </div>
    )
}

