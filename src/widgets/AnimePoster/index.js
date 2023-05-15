import React from "react";
import "./style.scss";

function AnimePoster(props) {
  const AnimeTitle = props.Title
  const AnimePoster = props.Poster
  const Premiered = props.Premiered
  const EpisodeNum = props.EpNum
  const AnimeType = props.Type

  function shortTitle() {
    if (!AnimeTitle) {
      return "Loading...";
    }
    if (AnimeTitle.length > 15) {
      return AnimeTitle.substring(0, 12) + "...";
    } else {
      return AnimeTitle;
    }
  }

  return (
    <a href={"/anime/" + props.AnimeID}>
      <div class="AnimePoster">
        <div class="AnimePosterHover BtnHover">
          <div class="AnimePosterHeader tooltip">
            <span class="tooltiptext">{AnimeTitle}</span>
            <h1>{shortTitle()}</h1>
          </div>
          <div class="AnimePosterDiv">
            <img class="AnimePosterImg" src={AnimePoster}></img>
          </div>
          <table class="AnimePosterInfo">
            <tbody>
              <tr>
                <td class="PropertyName">Type: </td>
                <td>{AnimeType ? AnimeType : "Unknown"}</td>
              </tr>
              <tr>
                <td class="PropertyName">Premiered: </td>
                <td>{Premiered ? Premiered : "Unknown"}</td>
              </tr>
              <tr>
                <td class="PropertyName">Episodes:</td>
                <td>{EpisodeNum ? EpisodeNum : "Unknown"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </a>
  );
}

export default AnimePoster;
