import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Home,
  NotFound,
  AnimeInfo,
  AnimePlayer,
  Search,
  Login,
  Signup,
  NoPlayer,
  UserProfile,
  List,
} from "./containers";
import Root from "./containers/Root";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import change_theme from "./themes";

export default function App() {
  useEffect(() => {
    (async () => {
      change_theme(document)
    })()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="" element={<Home/>}></Route>
          <Route path="/List/:Code" element={<List Mode="List"/>}></Route>
          <Route path="/watchlist" element={<List Mode="Watchlist"/>}></Route>
          <Route path="/watched" element={<List Mode="Watched"/>}></Route>
          <Route path="/finished" element={<List Mode="Finished"/>}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/UserProfile" element={<UserProfile />}></Route>
          <Route path="/Anime" element={<Navigate to="/Search" />}></Route>
          <Route path="/Search/:searchrule" element={<Search />}></Route>
          <Route path="/Search" element={<Navigate to="/Search/*" />}></Route>
          <Route path="/Anime/:AnimeID" element={<AnimeInfo />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>

        {
          // FIXME: Remove getElementById()'s from AnimePlayer so that
          //        it can be moved up ^^^
        }
        <Route
          path="/Anime/:AnimeID/Ep/:EpID"
          element={<AnimePlayer />}
        ></Route>
        <Route
          path="/Anime/:AnimeID/Ep"
          element={
            <Navigate to={"/Anime/" + window.location.href.split("/").at(-2)} />
          }
        ></Route>
        <Route path="/NoPlayer" element={<NoPlayer />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
