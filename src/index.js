import React from "react";
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
  Error,
} from "./containers";
import { AnimeInfo_loader } from "./containers/AnimeInfo";
import {
  Route,
  Navigate,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

function Root() {
  return <Outlet></Outlet>;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />}>
      <Route path="" element={<Navigate to="/Recomended" />}></Route>
      <Route path="/Recomended" element={<Home type="Recomended" />}></Route>
      <Route
        path="*/Recomended"
        element={<Navigate to="/Recomended" />}
      ></Route>
      <Route path="/Popular" element={<Home type="Popular" />}></Route>
      <Route path="*/Popular" element={<Navigate to="/Popular" />}></Route>
      <Route path="/Newest" element={<Home type="Newest" />}></Route>
      <Route path="*/Newest" element={<Navigate to="/Newest" />}></Route>
      <Route path="/Random" element={<Home type="Random" />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      <Route path="/Signup" element={<Signup />}></Route>

      <Route
        path="/Anime/:AnimeID"
        element={<AnimeInfo />}
        loader={AnimeInfo_loader}
      ></Route>
      <Route path="/Anime/:AnimeID/Ep/:EpID" element={<AnimePlayer />}></Route>
      <Route
        path="/Anime/:AnimeID/Ep"
        element={
          <Navigate to={"/Anime/" + window.location.href.split("/").at(-2)} />
        }
      ></Route>
      <Route path="/Anime" element={<Navigate to="/Search" />}></Route>
      <Route path="/Search/:searchrule" element={<Search />}></Route>
      <Route path="/Search" element={<Navigate to="/Search/*" />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
