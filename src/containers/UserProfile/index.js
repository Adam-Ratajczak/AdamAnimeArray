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
        if (Watchlist.length == 0) {
          const watchlist = await LoginMan.getWatchlist()

          let res = []
          let ids = []

          for (const elem of watchlist) {
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
                <img width="30" height="30" src={minus} alt={elem.AnimeID} class="RemoveAnimeImg" />
              </div>
            ))
          }
          SetWatchlist(res)
        }
      } else {
        redirect("/login")
      }
      let btns = document.querySelectorAll(".RemoveAnimeImg")

      for (const img of btns) {
        img.onclick = () => {
          LoginMan.removeFromWatchlist(img.alt)
          SetWatchlist([])
        }
      }
    })()
  })

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
