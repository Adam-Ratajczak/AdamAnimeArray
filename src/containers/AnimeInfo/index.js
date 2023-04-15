import React, { useState, useEffect } from "react";
import { AnimePoster, EpisodeBtn } from "./../../widgets";
import {
  GetAnime,
  GetFilterEntry,
  FilterAnimes,
  GetAnimeRelations,
} from "../../db_module";
import "./style.scss";
import plus from './plus.png'
import minus from './minus.png'

function AnimeInfo() {
  const AnimeID = window.location.href.split("/").at(-1);

  const [AnimeTitle, SetAnimeTitle] = useState(null);
  const [EnglishTitle, SetEnglishTitle] = useState(null);
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
  const [SavedToWatchlist, SetSavedToWatchlist] = useState(false);

  function isLoaded() {
    return (
      AnimeTitle !== null &&
      EnglishTitle !== null &&
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
    GetAnime(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        SetAnimeTitle(result.AnimeTitle);
        SetEnglishTitle(result.EnglishTitle);
        SetAnimeDesc(result.AnimeDesc);
        SetAiredBegin(result.AiredBegin);
        SetAiredEnd(result.AiredEnd);
        SetPosterURL(result.PosterURL);
        SetPremiered(result.Premiered);
        SetEpisodeNum(result.EpisodeNum);
        SetAnimeType(result.Type.Name);

        function PrepareGenreString(arr) {
          let res = "";

          for (let elem of arr) {
            res += elem.Name + ", ";
          }

          return res;
        }

        SetAnimeGenres(PrepareGenreString(result.Genres));
        SetAnimeThemes(PrepareGenreString(result.Themes));
        SetAnimeStudios(PrepareGenreString(result.Studios));
        SetAnimeProducers(PrepareGenreString(result.Producers));
        SetAnimeDemographics(PrepareGenreString(result.Demographics));
        SetAnimeGenres(PrepareGenreString(result.Genres));
      });
  }, []);

  useEffect(() => {
    GetAnimeRelations(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        let arr = new Map();

        for (let rel of result) {
          if (arr.has(rel.Relation.ID)) {
            arr.get(rel.Relation.ID).push(
              <a
                class="RelationEntry"
                href={"/anime/" + rel.OtherID.toString()}
              >
                {rel.OtherName}
              </a>
            );
          } else {
            arr.set(rel.Relation.ID, [
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
          const elem = result.find((v) => v.Relation.ID == key);

          relations.push(
            <div class="RelationType">
              <h2 class="RelationHeader">{elem.Relation.Name}</h2>
              <div>{val}</div>
            </div>
          );
        });

        SetAnimeRelations(relations);
      });
  }, []);

  useEffect(() => {
    GetFilterEntry(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        FilterAnimes(
          0,
          24,
          "",
          result.Types,
          result.Genres,
          result.Themes,
          [],
          []
        )
          .then((response) => response.json())
          .then((AnimeList) => {
            let res = [];
            let IDs = [];
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
              const elem = AnimeList[AnimeNum];
              let ID = elem.AnimeID;

              if (ID == AnimeID || IDs.indexOf(ID) != -1) {
                i--;
                continue;
              }

              res.push(
                <AnimePoster
                  AnimeID={ID}
                  Title={elem.AnimeTitle}
                  Poster={elem.PosterURL}
                  Premiered={elem.Premiered}
                  EpNum={elem.EpisodeNum}
                  Type={elem.Type.Name}
                />
              );
              IDs.push(ID);
            }
            SetAnimes(res);
          });
      });
  }, []);

  useEffect(() => {
    (async () => {
      if (LoginMan.LoggedIn()) {
        const watchlist = await LoginMan.getWatchlist()
        console.log(watchlist)
        const test = watchlist.find((val) => val.AnimeID == parseInt(AnimeID))

        if (test == undefined) {
          SetSavedToWatchlist(false)
        } else {
          SetSavedToWatchlist(true)
        }

        let img = document.getElementById("WatchlistBtn")
        img.onclick = async () => {
          if (img.classList.contains("RemFrom")) {
            LoginMan.removeFromWatchlist(AnimeID)
          } else if (img.classList.contains("AddTo")) {
            LoginMan.addToWatchlist(AnimeID)
          }

          window.location.reload()
        }
      }
    })();

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
                {AiredBegin.Time != "0001-01-01T00:00:00Z"
                  ? ABegin.toLocaleDateString("en-EN", options)
                  : "Unknown"}
              </td>
            </tr>
            <tr>
              <td class="AnimePropertyName">Finished: </td>
              <td>
                {AiredEnd.Time != "0001-01-01T00:00:00Z"
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
            <div
              className="Loading"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div id="main">
      <Menubar />
      <div id="AnimeInfoHeaderDiv">
        <h1>{AnimeTitle}<br /><i>{EnglishTitle}</i></h1>
        {LoginMan.LoggedIn() ? (!SavedToWatchlist ? (<div class="tooltip">
          <span class="tooltiptext">Add to watchlist</span>
          <img id="WatchlistBtn" class="AddTo" src={plus} width="32" height="32" />
        </div>) : (<div class="tooltip">
          <span class="tooltiptext">Remove from watchlist</span>
          <img id="WatchlistBtn" class="RemFrom" src={minus} width="32" height="32" />
        </div>)) :
          (<></>)}
      </div>
      {renderAnimeInfo()}
      <h1 id="SimilliarAnimeHeader">You may also like: </h1>
      <div id="SimiliarAnimes">{Animes}</div>
    </>
  );
}

export default AnimeInfo;
