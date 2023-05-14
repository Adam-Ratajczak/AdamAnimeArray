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
import LoginMan from "./login_manager";

export default function App() {

  useEffect(() => {
    (async () => {
      function rgb2hsv(r, g, b) {
        let v = Math.max(r, g, b), c = v - Math.min(r, g, b);
        let h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c));
        return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
      }

      function rgb2hex(str) {
        let r = 0
        let g = 0
        let b = 0
        let a = 0

        if (str.includes("rgba")) {
          str = str.substr(5, str.length - 6)

          const arr = str.split(", ")
          r = parseInt(arr[0])
          g = parseInt(arr[1])
          b = parseInt(arr[2])
          a = parseInt(arr[3])
        } else if (str.includes("rgb")) {
          str = str.substr(4, str.length - 5)

          const arr = str.split(", ")
          r = parseInt(arr[0])
          g = parseInt(arr[1])
          b = parseInt(arr[2])
          a = 255
        } else {
          return "#00000000"
        }

        return "#" + (r < 16 ? "0" : "") + r.toString(16) + (g < 16 ? "0" : "") + g.toString(16) + (b < 16 ? "0" : "") + b.toString(16) + (a < 16 ? "0" : "") + a.toString(16)
      }

      function ChangeMenubarImg(FgColor) {
        let r = parseInt(FgColor.substr(1, 2), 16)
        let g = parseInt(FgColor.substr(3, 2), 16)
        let b = parseInt(FgColor.substr(5, 2), 16)

        let hsv = rgb2hsv(r / 255, g / 255, b / 255)
        document.querySelector("#HeaderContent > img").style.filter = "hue-rotate(" + hsv[0] + "deg) brightness(" + hsv[1] * 100 + "%) saturate(" + hsv[2] * 100 + "%)"
      }

      function ChangeColors(orginal, new_color) {
        let elems = document.querySelectorAll("*")

        for (let elem of elems) {
          if (rgb2hex(window.getComputedStyle(elem).color) == orginal) {
            elem.style.color = new_color
          }

          if (rgb2hex(window.getComputedStyle(elem).backgroundColor) == orginal) {
            elem.style.backgroundColor = new_color
          }

          if (rgb2hex(window.getComputedStyle(elem).borderColor) == orginal) {
            elem.style.borderColor = new_color
          }
        }
      }

      if (LoginMan.LoggedIn()) {
        const theme = await LoginMan.getTheme();
        ChangeMenubarImg(theme.FgColor)
        ChangeColors("#011e2dff", theme.BaseColor)
        ChangeColors("#444444ff", theme.BgColor)
        ChangeColors("#333333ff", theme.BgColorDark)
        ChangeColors("#222233ff", theme.BgColorTheme)
        ChangeColors("#33333eff", theme.BgColorTilted)
        ChangeColors("#2e2e6555", theme.BtnHoverColor)
        ChangeColors("#f4f4ffff", theme.BtnHoverTextColor)
        ChangeColors("#a334e8ff", theme.FgColor)
        ChangeColors("#630f78ff", theme.FgColorDark)
        ChangeColors("#ffffffff", theme.TextColor)
        ChangeColors("#f5f5f5ff", theme.TextColorDark)
        ChangeColors("#add8e6ff", theme.TextColorTilted)
      } else {
        ChangeMenubarImg("#a334e8ff")
      }
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
