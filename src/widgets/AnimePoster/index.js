import React from "react";
import "./style.scss";
import "./ripple"

const color_array = ["#ffc107dd", "#28a745dd", "#007bffdd", "#dc3545dd", "#28a745dd", "#ff00ffdd"]

function AnimePoster(props) {
  const AnimeTitle = props.Title
  const AnimePoster = props.Poster
  const Premiered = props.Premiered
  const EpisodeNum = props.EpNum
  const AnimeType = props.Type
  const AnimeTypeID = parseInt(props.TypeID)

  return (
    <a href={"/anime/" + props.AnimeID}>
      <div class="AnimePoster ripple-hover" style={{backgroundImage: "url(\'"+AnimePoster+"\')"}}>
        <h2>{AnimeTitle}</h2>
        <div class="Triangle" style={{borderRightColor: color_array[AnimeTypeID - 1], borderTopColor: color_array[AnimeTypeID - 1]}}></div>
        <div class="AnimeType">{AnimeType}</div>
        <div class="AnimePosterInfo">
          <table>
            <thead>{AnimeTitle}</thead>
            <tbody>
              {Premiered ? (<tr><th>Premiered:</th><td>{Premiered}</td></tr>) : (<></>)}
              <tr><th>Episodes:</th><td>{EpisodeNum}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </a>
  );
}

export default AnimePoster;
