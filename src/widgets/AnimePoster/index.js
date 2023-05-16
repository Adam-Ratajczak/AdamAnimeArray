import React from "react";
import "./style.scss";
import "./ripple"
import minus from "./minus.png"
import LoginMan from "../../login_manager";

const color_array = ["#ffc107dd", "#28a745dd", "#007bffdd", "#dc3545dd", "#28a745dd", "#ff00ffdd"]

function AnimePoster(props) {
  const AnimeTitle = props.Title
  const AnimePoster = props.Poster
  const Premiered = props.Premiered
  const EpisodeNum = props.EpNum
  const AnimeType = props.Type
  const AnimeTypeID = parseInt(props.TypeID)
  const Mode = props.Mode

  function RemoveFramWatchlist() {
    LoginMan.removeFromWatchlist(parseInt(props.AnimeID))
    window.location.reload()
  }

  return (
    <div class="PosterWrapper">
      <a href={"/anime/" + props.AnimeID}>
        <div class="AnimePoster ripple-hover" style={{ backgroundImage: "url(\'" + AnimePoster + "\')" }}>
          <h2>{AnimeTitle}</h2>
          {Mode == "watchlist" ? (<a href=""><img class="WatchlistMinus" onClick={RemoveFramWatchlist} src={minus} /></a>) : (<></>)}
          <div class="Triangle" style={{ borderRightColor: color_array[AnimeTypeID - 1], borderTopColor: color_array[AnimeTypeID - 1] }}></div>
          <div class="AnimeType">{AnimeType}</div>
          <div class="AnimePosterInfo">
            <i>{AnimeTitle}</i>
            <table>
              <tbody>
                {Premiered ? (<tr><th>Premiered:</th><td>{Premiered}</td></tr>) : (<></>)}
                <tr><th>Episodes:</th><td>{EpisodeNum}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </a>
    </div>
  );
}

export default AnimePoster;
