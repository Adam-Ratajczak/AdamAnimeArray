import React, { useEffect, useState } from "react";
import { GetAnime, GetEpisodes, GetAnimeType } from "../../db_module";
import "./style.scss";

function AnimePoster(props) {
  const [AnimeTitle, SetAnimeTitle] = useState(null);
  const [AnimePoster, SetAnimePoster] = useState(null);
  const [Premiered, SetPremiered] = useState(null);
  const [EpisodeNum, SetEpisodeNum] = useState(null);
  const [AnimeType, SetAnimeType] = useState(null);

  function isLoaded() {
    return (
      AnimeTitle !== null &&
      AnimePoster !== null &&
      Premiered !== null &&
      EpisodeNum !== null &&
      AnimeType !== null
    );
  }

  useEffect(() => {
    GetAnime(props.AnimeID)
      .then((response) => response.json())
      .then((result) => {
        SetAnimeTitle(result.AnimeTitle);
        SetAnimePoster(result.PosterURL);
        SetPremiered(result.Premiered);
      });
  }, []);

  useEffect(() => {
    GetEpisodes(props.AnimeID)
      .then((response) => response.json())
      .then((result) => {
        SetEpisodeNum(result.length);
      });
  }, []);

  useEffect(() => {
    GetAnimeType(props.AnimeID)
      .then((response) => response.json())
      .then((result) => {
        SetAnimeType(result.Name);
      });
  }, []);

  function shortTitle() {
    if (!AnimeTitle) {
      return "Loading...";
    }
    if (AnimeTitle.toString().length > 15) {
      return AnimeTitle.toString().substring(0, 12) + "...";
    } else {
      return AnimeTitle;
    }
  }

  return (
    <a href={"/anime/" + props.AnimeID.toString()}>
      <div class="AnimePoster">
        <div class="AnimePosterHover">
          {isLoaded() ? (
            <>
              <div class="AnimePosterHeader tooltip">
                <span class="tooltiptext">{AnimeTitle}</span>
                <h1>{shortTitle()}</h1>
              </div>
              <div class="AnimePosterDiv">
                <img class="AnimePosterImg" src={AnimePoster.toString()}></img>
              </div>
              <table class="AnimePosterInfo">
                <tbody>
                  <tr>
                    <td class="PropertyName">Type: </td>
                    <td>{AnimeType ? AnimeType.toString() : "Unknown"}</td>
                  </tr>
                  <tr>
                    <td class="PropertyName">Premiered: </td>
                    <td>{Premiered ? Premiered.toString() : "Unknown"}</td>
                  </tr>
                  <tr>
                    <td class="PropertyName">Episodes:</td>
                    <td>{EpisodeNum ? EpisodeNum.toString() : "Unknown"}</td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <div class="Loading"></div>
          )}
        </div>
      </div>
    </a>
  );
}

export default AnimePoster;
