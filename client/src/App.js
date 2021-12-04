import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import LandingPage from './components/LandingPage'
import AllGames from './components/AllGames'
import VideoGameCreated  from "./components/VideoGameCreated";
import DetailGame from './components/DetailGame';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
        {/* COn el Switch la url solo va a coincidir con el path */}
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/Home' element={<AllGames/>}/>
          <Route path='/videogame' element={<VideoGameCreated/>}/>
          <Route path='/videogame/:id' element={<DetailGame/>}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}


export default App;