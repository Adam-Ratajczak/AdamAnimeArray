import React, { useState, useEffect } from "react";
import "./style.scss";
import LoginMan from "../../login_manager";
import { redirect } from "react-router-dom";
import { AnimePoster } from "../../widgets";
import minus from "./minus.png";

function UserProfile() {
  const [Watchlist, SetWatchlist] = useState([])

  useEffect(() => {
    (async () => {
      if (LoginMan.LoggedIn()) {
        const watchlist = await LoginMan.getWatchlist()
        let res = []

        for (const elem of watchlist) {
          function delete_func() {
            LoginMan.removeFromWatchlist(parseInt(elem.AnimeID))
            window.location.reload()
          }
          res.push((
            <div class="PosterOutline">
              <AnimePoster
                AnimeID={elem.AnimeID}
                Title={elem.AnimeTitle}
                Poster={elem.PosterURL}
                Premiered={elem.Premiered}
                EpNum={elem.EpisodeNum}
                Type={elem.Type.Name}
              />
              <img width="30" height="30" src={minus} onClick={delete_func} class="RemoveAnimeImg" />
            </div>
          ))
          SetWatchlist(res)
        }
      } else {
        redirect("/login")
      }
      let btns = document.querySelectorAll(".RemoveAnimeImg")
    })()
  }, [])

  return (
    <>
      <div id="content">
        <div id="ContentHeader">
          <h1>Your Watchlist:</h1>
        </div>
        <div id="SampleAnimeList">{Watchlist}</div>
      </div>
    </>
  );
}

export default UserProfile;
