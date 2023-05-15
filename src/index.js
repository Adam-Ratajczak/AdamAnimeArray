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
          <Route path="" element={<Navigate to="/Recomended" />}></Route>
          <Route path="/Recomended" element={<Home />}></Route>
          <Route path="/Popular" element={<Home />}></Route>
          <Route path="/Newest" element={<Home />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/UserProfile" element={<UserProfile />}></Route>
          <Route
            path="*/Recomended"
            element={<Navigate to="/Recomended" />}
          ></Route>
          <Route path="*/Popular" element={<Navigate to="/Popular" />}></Route>
          <Route path="*/Newest" element={<Navigate to="/Newest" />}></Route>
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
