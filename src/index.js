import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Home, NotFound, AnimeInfo, AnimePlayer, Search, AnimeEpisodes} from './containers'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/Recomended" element={<Home />}></Route>
          <Route path="*/Recomended" element={<Navigate to="/Recomended"/>}></Route>
          <Route path="/Popular" element={<Home />}></Route>
          <Route path="*/Popular" element={<Navigate to="/Popular"/>}></Route>
          <Route path="/Newest" element={<Home />}></Route>
          <Route path="*/Newest" element={<Navigate to="/Newest"/>}></Route>
          <Route path="/Random" element={<Home />}></Route>
          <Route path='/' element={<Navigate to="/Recomended"/>}></Route>
          <Route path="/Anime/:AnimeID" element={<AnimeInfo />}></Route>
          <Route path="/Anime/:AnimeID/Ep" element={<AnimeEpisodes />}></Route>
          <Route path="/Anime/:AnimeID/Ep/:EpID" element={<AnimePlayer />}></Route>
          <Route path='/Anime' element={<Navigate to="/Search"/>}></Route>
          <Route path="/Search/:searchrule" element={<Search />}></Route>
          <Route path='/Search' element={<Navigate to="/Search/Name?=*Genre?=*Type?=*Demographics?=*Producer?=*"/>}></Route>
          <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);