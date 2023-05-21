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

  let WatchedInfo = (<></>)

  if(Mode == "watched"){
    const options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const watchedTime = new Date(props.Watched.Time);
    WatchedInfo = (<i>{"You finished watching this anime " + ((props.EpNr) ?  " at ep. " + props.EpNr : "") + (props.Watched.Valid ? " on " + watchedTime.toLocaleDateString("en-EN", options) : "")}</i>)
  }

  function RemoveFramWatchlist(ev) {
    LoginMan.removeFromWatchlist(parseInt(props.AnimeID)).then(() => {
      window.location.reload()
    })
    ev.preventDefault()
  }

  return (
    <div class="PosterWrapper">
      <a href={"/anime/" + props.AnimeID + (props.EpNr ? "/ep/" + props.EpNr : "") }>
        <div class="AnimePoster ripple-hover" style={{ backgroundImage: "url(\'" + AnimePoster + "\')" }}>
          <h2>{AnimeTitle}</h2>
          {Mode == "watchlist" ? (<a href=""><img class="WatchlistMinus" onClick={RemoveFramWatchlist} src={minus} /></a>) : (<></>)}
          <div class="Triangle" style={{ borderRightColor: color_array[AnimeTypeID - 1], borderTopColor: color_array[AnimeTypeID - 1] }}></div>
          <div class="AnimeType">{AnimeType}</div>
          <div class="AnimePosterInfo">
            <i style={{fontWeight: 500}}>{AnimeTitle}</i>
            {WatchedInfo}
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
