import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Menubar, AnimePoster, EpisodeBtn } from "./../../widgets";
import {
  GetAnime,
  GetAnimeDemographics,
  GetAnimeGenres,
  GetAnimeProducers,
  GetAnimeThemes,
  GetAnimeType,
  GetEpisodes,
  GetFilterEntry,
  FilterAnimes,
} from "../../db_module";
import redirect from "../../redirect";
import "./style.scss";

function AnimeInfo() {
  const [AnimeTitle, SetAnimeTitle] = useState(0);
  const [AnimeDesc, SetAnimeDesc] = useState(0);
  const [AiredBegin, SetAiredBegin] = useState(0);
  const [AiredEnd, SetAiredEnd] = useState(0);
  const [PosterURL, SetPosterURL] = useState(0);
  const [Premiered, SetPremiered] = useState(0);
  const [EpisodeNum, SetEpisodeNum] = useState(0);
  const [AnimeType, SetAnimeType] = useState(0);
  const [AnimeGenres, SetAnimeGenres] = useState(0);
  const [AnimeThemes, SetAnimeThemes] = useState(0);
  const [AnimeProducers, SetAnimeProducers] = useState(0);
  const [AnimeDemographics, SetAnimeDemographics] = useState(0);

  const [Animes, SetAnimes] = useState([]);

  const { AnimeID } = useParams();

  useEffect(() => {
    GetFilterEntry(AnimeID).then((response) => {
      if (response.status != 200) {
        redirect("/");
      }
    });
  }, [AnimeID]);

  useEffect(() => {
    GetAnime(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        SetAnimeTitle(result.AnimeTitle);
        SetAnimeDesc(result.AnimeDesc);
        SetAiredBegin(result.AiredBegin);
        SetAiredEnd(result.AiredEnd);
        SetPosterURL(result.PosterURL);
        SetPremiered(result.Premiered);
      });
  }, [AnimeID]);

  useEffect(() => {
    GetEpisodes(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        SetEpisodeNum(result.length);
      });
  }, [AnimeID]);

  useEffect(() => {
    GetAnimeGenres(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        let res = "";

        for (let elem of result) {
          res += elem.Name + ", ";
        }

        SetAnimeGenres(res);
      });
  }, [AnimeID]);

  useEffect(() => {
    GetAnimeThemes(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        let res = "";

        for (let elem of result) {
          res += elem.Name + ", ";
        }

        SetAnimeThemes(res);
      });
  }, [AnimeID]);

  useEffect(() => {
    GetAnimeProducers(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        let res = "";

        for (let elem of result) {
          res += elem.Name + ", ";
        }

        SetAnimeProducers(res);
      });
  }, [AnimeID]);

  useEffect(() => {
    GetAnimeDemographics(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        let res = "";

        for (let elem of result) {
          res += elem.Name + ", ";
        }

        SetAnimeDemographics(res);
      });
  }, [AnimeID]);

  useEffect(() => {
    GetAnimeType(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        SetAnimeType(result.Name);
      });
  }, [AnimeID]);

  useEffect(() => {
    GetFilterEntry(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        FilterAnimes("", result.Types, result.Genres, result.Themes, [], [])
          .then((response) => response.json())
          .then((AnimeList) => {
            let res = [];
            for (
              let i = 0;
              i <
              Math.min(
                AnimeList.length - 1,
                Math.floor(window.screen.width / 270) * 2
              );
              i++
            ) {
              let AnimeNum = Math.floor(
                (Math.random() * AnimeList.length) % AnimeList.length
              );
              let ID = AnimeList[AnimeNum].AnimeID;

              res.push(<AnimePoster AnimeID={ID} />);
            }
            SetAnimes(res);
          });
      });
  }, [AnimeID]);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const ABegin = new Date(AiredBegin.Time);
  const AEnd = new Date(AiredEnd.Time);

  return (
    <div id="main">
      <Menubar />
      <h1 id="AnimeInfoHeader">{AnimeTitle}</h1>
      <div id="AnimeInfoContent">
        <div id="AnimeDescContainer">
          <div id="AnimeInfoPosterContainer">
            <img src={PosterURL} id="AnimeInfoPoster" />
            <div>
              <h3 class="InfoHeader">General information:</h3>
              <table>
                <tbody>
                  <tr>
                    <td class="AnimePropertyName">Type: </td>
                    <td>{AnimeType ? AnimeType.toString() : "Unknown"}</td>
                  </tr>
                  <tr>
                    <td class="AnimePropertyName">Episodes: </td>
                    <td>{EpisodeNum ? EpisodeNum.toString() : "Unknown"}</td>
                  </tr>
                  <tr>
                    <td class="AnimePropertyName">Premiered: </td>
                    <td>{Premiered ? Premiered.toString() : "Unknown"}</td>
                  </tr>
                  <tr>
                    <td class="AnimePropertyName">Aired: </td>
                    <td>
                      {AiredBegin.Valid
                        ? ABegin.toLocaleDateString("en-EN", options)
                        : "Unknown"}
                    </td>
                  </tr>
                  <tr>
                    <td class="AnimePropertyName">Finished: </td>
                    <td>
                      {AiredEnd.Valid
                        ? AEnd.toLocaleDateString("en-EN", options)
                        : "Unknown"}
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 class="InfoHeader">Anime type:</h3>
              <table>
                <tbody>
                  <tr>
                    <td class="AnimePropertyName">Genres: </td>
                    <td>
                      {AnimeGenres != ""
                        ? AnimeGenres.toString().substring(
                            0,
                            AnimeGenres.toString().length - 2
                          )
                        : "None"}
                    </td>
                  </tr>
                  <tr>
                    <td class="AnimePropertyName">Themes: </td>
                    <td>
                      {AnimeThemes != ""
                        ? AnimeThemes.toString().substring(
                            0,
                            AnimeThemes.toString().length - 2
                          )
                        : "None"}
                    </td>
                  </tr>
                  <tr>
                    <td class="AnimePropertyName">Producers: </td>
                    <td>
                      {AnimeProducers != ""
                        ? AnimeProducers.toString().substring(
                            0,
                            AnimeProducers.toString().length - 2
                          )
                        : "None"}
                    </td>
                  </tr>
                  <tr>
                    <td class="AnimePropertyName">Demographics: </td>
                    <td>
                      {AnimeDemographics != ""
                        ? AnimeDemographics.toString().substring(
                            0,
                            AnimeDemographics.toString().length - 2
                          )
                        : "None"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            {AnimeDesc.toString()
              .split("<br>")
              .map((line) => {
                return <p>{line}</p>;
              })}
          </div>
        </div>
        <div id="AnimeInfoContainer">
          <h2 class="InfoHeader">Episodes:</h2>
          <EpisodeBtn
            AnimeID={AnimeID}
            EpisodeNum="0"
            EpisodeCount={EpisodeNum}
          />
        </div>
      </div>
      <h1 id="SimilliarAnimeHeader">You may also like: </h1>
      <div id="SimiliarAnimes">{Animes}</div>
    </div>
  );
}

export default AnimeInfo;
