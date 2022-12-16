import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Home, NotFound, AnimeInfo, AnimePlayer, Search, TypeList} from './containers'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
          <Route index element={<Home />}></Route>
          <Route path="Anime/:name" element={<AnimeInfo />}></Route>
          <Route path="Watch/:id" element={<AnimePlayer />}></Route>
          <Route path="Search" element={<Search />}></Route>
          <Route path="Result:filter" element={<TypeList />}></Route>
          <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);