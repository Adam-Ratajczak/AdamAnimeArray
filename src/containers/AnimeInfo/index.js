import React, { useState, useEffect } from "react";
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
  GetAnimeStudios,
  GetAnimeRelations,
  GetRelations,
} from "../../db_module";
import redirect from "../../redirect";
import "./style.scss";

function AnimeInfo() {
  const AnimeID = window.location.href.split("/").at(-1);

  const [AnimeTitle, SetAnimeTitle] = useState(null);
  const [AnimeDesc, SetAnimeDesc] = useState(null);
  const [AiredBegin, SetAiredBegin] = useState(null);
  const [AiredEnd, SetAiredEnd] = useState(null);
  const [PosterURL, SetPosterURL] = useState(null);
  const [Premiered, SetPremiered] = useState(null);
  const [EpisodeNum, SetEpisodeNum] = useState(null);
  const [AnimeType, SetAnimeType] = useState(null);
  const [AnimeGenres, SetAnimeGenres] = useState(null);
  const [AnimeThemes, SetAnimeThemes] = useState(null);
  const [AnimeStudios, SetAnimeStudios] = useState(null);
  const [AnimeProducers, SetAnimeProducers] = useState(null);
  const [AnimeDemographics, SetAnimeDemographics] = useState(null);

  const [Animes, SetAnimes] = useState([]);
  const [AnimeRelations, SetAnimeRelations] = useState([]);

  function isLoaded() {
    return (
      AnimeTitle !== null &&
      AnimeDesc !== null &&
      AiredBegin !== null &&
      AiredEnd !== null &&
      PosterURL !== null &&
      Premiered !== null &&
      EpisodeNum !== null &&
      AnimeType !== null &&
      AnimeGenres !== null &&
      AnimeThemes !== null &&
      AnimeStudios !== null &&
      AnimeProducers !== null &&
      AnimeDemographics !== null
    );
  }

  useEffect(() => {
    GetFilterEntry(AnimeID).then((response) => {
      if (response.status != 200) {
        redirect("/");
      }
    });
  }, []);

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
  }, []);

  useEffect(() => {
    GetEpisodes(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        SetEpisodeNum(result.length);
      });
  }, []);

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
  }, []);

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
  }, []);

  useEffect(() => {
    GetAnimeStudios(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        let res = "";

        for (let elem of result) {
          res += elem.Name + ", ";
        }

        SetAnimeStudios(res);
      });
  }, []);

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
  }, []);

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
  }, []);

  useEffect(() => {
    GetAnimeType(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        SetAnimeType(result.Name);
      });
  }, []);

  useEffect(() => {
    GetAnimeRelations(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        let arr = new Map();

        for (let rel of result) {
          if (arr.has(rel.RelationID)) {
            arr.get(rel.RelationID).push(
              <a
                class="RelationEntry"
                href={"/anime/" + rel.OtherID.toString()}
              >
                {rel.OtherName}
              </a>
            );
          } else {
            arr.set(rel.RelationID, [
              <a
                class="RelationEntry"
                href={"/anime/" + rel.OtherID.toString()}
              >
                {rel.OtherName}
              </a>,
            ]);
          }
        }

        let relations = [];

        arr.forEach((val, key) => {
          GetRelations(key)
            .then((response) => response.json())
            .then((result) => {
              relations.push(
                <div class="RelationType">
                  <h2 class="RelationHeader">{result.Name}</h2>
                  <div>{val}</div>
                </div>
              );
            });
        });

        SetAnimeRelations(relations);
      });
  }, []);

  useEffect(() => {
    GetFilterEntry(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        FilterAnimes("", result.Types, result.Genres, result.Themes, [], [])
          .then((response) => response.json())
          .then((AnimeList) => {
            let res = [];
            let IDs = []
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

              if(ID == AnimeID || IDs.indexOf(ID) != -1){
                i--
                continue
              }

              res.push(<AnimePoster AnimeID={ID} key={ID} />);
              IDs.push(ID)
            }
            SetAnimes(res);
          });
      });
  }, []);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const ABegin = AiredBegin ? new Date(AiredBegin.Time) : null;
  const AEnd = AiredEnd ? new Date(AiredEnd.Time) : null;

  function renderInfoTable() {
    return (
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
                {AnimeGenres !== ""
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
                {AnimeThemes !== ""
                  ? AnimeThemes.toString().substring(
                      0,
                      AnimeThemes.toString().length - 2
                    )
                  : "None"}
              </td>
            </tr>
            <tr>
              <td class="AnimePropertyName">Studios: </td>
              <td>
                {AnimeStudios !== ""
                  ? AnimeStudios.toString().substring(
                      0,
                      AnimeProducers.toString().length - 2
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
    );
  }

  function renderAnimeDesc() {
    return (
      <div id="AnimeDescContainer">
        {isLoaded() ? (
          <>
            <div id="AnimeInfoPosterContainer">
              <img src={PosterURL} id="AnimeInfoPoster" />
              {renderInfoTable()}
            </div>
            <div>
              {isLoaded() ? (
                AnimeDesc.toString()
                  .split("\n\n")
                  .map((line) => {
                    return <p>{line}</p>;
                  })
              ) : (
                <div class="Loading" />
              )}
            </div>
            <div id="AnimeRelationContainer">{AnimeRelations}</div>
          </>
        ) : (
          <div class="Loading" />
        )}
      </div>
    );
  }

  function renderAnimeInfo() {
    return (
      <div id="AnimeInfoContent">
        {renderAnimeDesc()}
        <div id="AnimeInfoContainer">
          {isLoaded() ? (
            <>
              <h2 class="InfoHeader">Episodes:</h2>
              <EpisodeBtn
                AnimeID={AnimeID}
                EpisodeNum="0"
                EpisodeCount={EpisodeNum}
              />
            </>
          ) : (
            <div className="Loading" style={{width: "100%", height: "100%"}}/>
          )}
        </div>
      </div>
    );
  }

  return (
    <div id="main">
      <Menubar />
      <h1 id="AnimeInfoHeader">{AnimeTitle}</h1>
      {renderAnimeInfo()}
      <h1 id="SimilliarAnimeHeader">You may also like: </h1>
      <div id="SimiliarAnimes">{Animes}</div>
    </div>
  );
}

export default AnimeInfo;
