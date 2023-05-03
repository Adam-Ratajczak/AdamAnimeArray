import React, { useState, useEffect } from "react";
import { AnimePoster, EpisodeBtn } from "./../../widgets";
import {
  GetAnime,
  GetAnimeRelations,
  GetAnimeRange,
  ClearProgress,
} from "../../db_module";
import "./style.scss";
import plus from "./plus.png";
import minus from "./minus.png";
import LoginMan from "../../login_manager";

function ChatEntry(props) {
  const [UserName, SetUserName] = useState(0)
  const [UserIcon, SetUserIcon] = useState(0)

  const UserID = props.UserID
  const CommentText = props.CommentText
  const depth = props.Depth

  useEffect(() => {

  })

  return (
    <div class="ChatEntry">
      <div class="ChatUserImg">
        <img src={UserIcon} />
      </div>
      <div class="ChatContent">
        <h2>{UserName}</h2>
        <p>{CommentText}</p>
      </div>
    </div>
  )
}

function AnimeInfo() {
  const AnimeID = parseInt(window.location.href.split("/").at(-1));

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

  const [MalLink, SetMalLink] = useState(null);
  const [MalRank, SetMalRank] = useState(null);

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
        SetMalLink(result.MalLink);
        SetMalRank(result.MalRank);

        function PrepareGenreString(arr) {
          let res = "";

          for (let elem of arr) {
            res += elem.Name + ", ";
          }

          return res.length > 50 ? (res.substring(0, 47) + "...") : res;
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
              <div style={{ height: val.length * 48 }}>{val}</div>
            </div>
          );
        });

        SetAnimeRelations(relations);
      });
  }, []);

  useEffect(() => {
    GetAnimeRange(0, Math.floor(window.screen.width / 270 * 2), 2)
      .then((response) => response.json())
      .then((AnimeList) => {
        let res = [];
        let IDs = [];
        for (let i = 0; i < AnimeList.Animes.length - 1; i++) {
          const elem = AnimeList.Animes[i];
          let ID = elem.AnimeID;
          res.push(
            <div class="PosterOutline">
              <AnimePoster
                AnimeID={ID}
                Title={elem.AnimeTitle}
                Poster={elem.PosterURL}
                Premiered={elem.Premiered}
                EpNum={elem.EpisodeNum}
                Type={elem.Type.Name}
              />
            </div>
          );
          IDs.push(ID);
        }
        SetAnimes(res);
      });
  }, []);

  useEffect(() => {
    (async () => {
      if (LoginMan.LoggedIn()) {
        const watchlist = await LoginMan.getWatchlist();
        console.log(watchlist);
        const test = watchlist.find((val) => val.AnimeID == parseInt(AnimeID));

        if (test == undefined) {
          SetSavedToWatchlist(false);
        } else {
          SetSavedToWatchlist(true);
        }

        document.getElementById("WriteChat").addEventListener("submit", async (ev) => {
          let input = document.getElementById("WriteChatInput")
          await LoginMan.writeComment(AnimeID, 0, input.value)
          input.value = ""

          window.location.reload()
        })
      }
    })();
  }, []);

  const foo = () => {
    ClearProgress(LoginMan.Token(), parseInt(AnimeID))

    window.location.reload()
  }

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
      <div id="AnimeProperties">
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
        </div>

        <div>
          <h3 class="InfoHeader">Anime type:</h3>
          <table>
            <tbody>
              <tr>
                <td class="AnimePropertyName">Genres: </td>
                <td>
                  {AnimeGenres !== "" ? AnimeGenres : "None"}
                </td>
              </tr>
              <tr>
                <td class="AnimePropertyName">Themes: </td>
                <td>
                  {AnimeThemes !== "" ? AnimeThemes : "None"}
                </td>
              </tr>
              <tr>
                <td class="AnimePropertyName">Studios: </td>
                <td>
                  {AnimeStudios !== "" ? AnimeStudios : "None"}
                </td>
              </tr>
              <tr>
                <td class="AnimePropertyName">Producers: </td>
                <td>
                  {AnimeProducers != "" ? AnimeProducers : "None"}
                </td>
              </tr>
              <tr>
                <td class="AnimePropertyName">Demographics: </td>
                <td>
                  {AnimeDemographics != "" ? AnimeDemographics : "None"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 class="InfoHeader">External data:</h3>
          <table>
            <tbody>
              <tr>
                <td class="AnimePropertyName">More info: </td>
                <td>
                  <a href={MalLink}>{MalLink.length > 70 ? (MalLink.substring(0, 67) + "...") : MalLink}</a>
                </td>
              </tr>
              <tr>
                <td class="AnimePropertyName">Popularity: </td>
                <td>
                  <span>{MalRank == 0 ? "N / A" : ("#" + MalRank)}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
              <div id="InfoHeaderDiv"><h2 class="InfoHeader">Episodes:</h2>{LoginMan.LoggedIn() ? (<span id="clearhistory" onClick={foo}>clear history</span>) : (<></>)}</div>
              <EpisodeBtn AnimeID={AnimeID} />
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

  function watchlistBtnOnClick() {
    if (SavedToWatchlist) {
      LoginMan.removeFromWatchlist(AnimeID).then((v) => {
        if (v) {
          SetSavedToWatchlist(false);
        }
      });
    } else {
      LoginMan.addToWatchlist(AnimeID).then((v) => {
        if (v) {
          SetSavedToWatchlist(true);
        }
      });
    }
  }

  return (
    <>
      <div id="content">
        <div id="AnimeInfoHeaderDiv">
          <h1>
            {AnimeTitle}
            <br />
            <i>{EnglishTitle}</i>
          </h1>
          {LoginMan.LoggedIn() ? (
            <div class="tooltip">
              <span class="tooltiptext">Add to watchlist</span>
              <img
                id="WatchlistBtn"
                alt="Add to watchlist"
                src={SavedToWatchlist ? minus : plus}
                width="32"
                height="32"
                onClick={watchlistBtnOnClick}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        {renderAnimeInfo()}
        <div id="SimiliarAnimeDiv">
          <h1 id="SimilliarAnimeHeader">You may also like: </h1>
          <div id="SimiliarAnimes">{Animes}</div>
        </div>
        <div id="ChatDiv">
          <h2>Comments:</h2>
          {LoginMan.LoggedIn() ? (
            <form id="WriteChat">
              <p>Did you like this anime? Share your opinion with others!</p>
              <input type="text" id="WriteChatInput" required placeholder="Write comment" />
              <input type="submit" id="WriteChatSubmit" value="Post a comment" />
            </form>
          ) : (
            <div id="WriteChat">
              Log in to post comments!
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AnimeInfo;
