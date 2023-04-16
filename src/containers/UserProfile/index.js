import React, { useState, useEffect } from "react";
import "./style.scss";
import LoginMan from "../../login_manager";
import { redirect } from "react-router-dom";
import { AnimePoster } from "../../widgets";

function UserProfile() {
  const [Watchlist, SetWatchlist] = useState([])

  useEffect(() => {
    (async () => {
      if (LoginMan.LoggedIn()) {
        if(Watchlist.length == 0){
          const watchlist = await LoginMan.getWatchlist()

          let res = []

          for(const elem of watchlist){
            res.push((
              <AnimePoster
                AnimeID={elem.AnimeID}
                Title={elem.AnimeTitle}
                Poster={elem.PosterURL}
                Premiered={elem.Premiered}
                EpNum={elem.EpisodeNum}
                Type={elem.Type.Name}
              />))
          }
          SetWatchlist(res)
        }
      } else {
        redirect("/login")
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
