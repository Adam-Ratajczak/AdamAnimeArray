import React, { useState, useEffect } from "react";
import { AnimePoster, EpisodeBtn } from "./../../widgets";
import {
  GetAnime,
  GetAnimeRelations,
  GetAnimeRange,
  ClearProgress,
  GetComments,
} from "../../db_module";
import "./style.scss";
import plus from "./plus.png";
import minus from "./minus.png";
import thumbup from "./thumbup.png"
import thumbdown from "./thumbdown.png"
import LoginMan from "../../login_manager";
import Icon from "../../widgets/Menubar/userdefault";

const isFirefox = navigator.userAgent.indexOf("Firefox") != -1

function ChatEntry(props) {
  const [Upvotes, SetUpvotes] = useState(0)
  const [Downvotes, SetDownvotes] = useState(0)

  const EntryID = parseInt(props.EntryID)
  const AnimeID = parseInt(props.AnimeID)
  const CommentText = props.CommentText
  const UserID = parseInt(props.User.UserID)
  const UserName = props.User.UserName
  const UserIcon = props.User.UserProfileImageUrl
  const Submitted = props.Submitted
  const Depth = parseInt(props.Depth)
  const Upvote = parseInt(props.Upvote)
  const Downvote = parseInt(props.Downvote)
  const Reaction = parseInt(props.Reaction)

  useEffect(() => {
    if (!LoginMan.LoggedIn()) {
      return
    }

    document.getElementById("ReplyPrompt" + EntryID).addEventListener("submit", async (ev) => {
      let value = document.getElementById("ReplyValue" + EntryID).value
      if (isFirefox) {
        try {
          await LoginMan.writeComment(AnimeID, EntryID, value)
        } catch {
          await LoginMan.writeComment(AnimeID, EntryID, value)
        }
      } else {
        await LoginMan.writeComment(AnimeID, EntryID, value)
      }
    })
    SetUpvotes(Upvote)
    SetDownvotes(Downvote)

    let upvote_btn = document.getElementById("upvote" + EntryID)
    let downvote_btn = document.getElementById("downvote" + EntryID)

    if(Reaction == -1){
      downvote_btn.classList.add("Reacted")
    }else if(Reaction == 1){
      upvote_btn.classList.add("Reacted")
    }

    upvote_btn.onclick = () => {
      let upvote_int = parseInt(upvote_btn.querySelector("span").innerText)
      let downvote_int = parseInt(downvote_btn.querySelector("span").innerText)

      if (upvote_btn.classList.contains("Reacted")) {
        upvote_btn.classList.remove("Reacted")
        SetUpvotes(upvote_int - 1)
        LoginMan.reactComment(EntryID, 0)
      } else {
        upvote_btn.classList.add("Reacted")
        if (downvote_btn.classList.contains("Reacted")) {
          downvote_btn.classList.remove("Reacted")
          SetDownvotes(downvote_int - 1)
        }
        SetUpvotes(upvote_int + 1)
        LoginMan.reactComment(EntryID, 1)
      }
    }

    downvote_btn.onclick = () => {
      let upvote_int = parseInt(upvote_btn.querySelector("span").innerText)
      let downvote_int = parseInt(downvote_btn.querySelector("span").innerText)

      if (downvote_btn.classList.contains("Reacted")) {
        downvote_btn.classList.remove("Reacted")
        SetDownvotes(downvote_int - 1)
        LoginMan.reactComment(EntryID, 0)
      } else {
        downvote_btn.classList.add("Reacted")
        if (upvote_btn.classList.contains("Reacted")) {
          upvote_btn.classList.remove("Reacted")
          SetUpvotes(upvote_int - 1)
        }
        SetDownvotes(downvote_int + 1)
        LoginMan.reactComment(EntryID, -1)
      }
    }
  }, [])

  function ReplyFunc() {
    document.getElementById("ReplyPrompt" + EntryID).style.display = "block"
  }

  function DelFunc() {
    LoginMan.delComment(AnimeID, EntryID)
    window.location.reload(true)
  }

  return (
    <div class="ChatEntry" style={{ marginLeft: Depth * 30 }}>
      <div class="ChatUserImg">
        {UserIcon.Valid ? (
          <img
            src={UserIcon.String}
            alt="User profile"
          ></img>
        ) : (Icon())}
      </div>
      <div class="ChatContent">
        <h2>{UserName}:<i>{Submitted}</i></h2>
        <p>{CommentText}</p>
        {LoginMan.LoggedIn() ? (<div class="MessageFooter">
          <div>
            <span onClick={ReplyFunc}>Reply</span>
            {LoginMan.UserID() == UserID ? (<span onClick={DelFunc}>Delete</span>) : (<></>)}
          </div>
          <div>
            <div class="ReactionContainer" id={"upvote" + EntryID}>
              <img src={thumbup} width="16" height="16" />
              <span>{Upvotes}</span>
            </div>
            <div class="ReactionContainer" id={"downvote" + EntryID}>
              <img src={thumbdown} width="16" height="16" />
              <span>{Downvotes}</span>
            </div>
          </div>
        </div>) : (<i class="MessageFooter">Log in to reply this message!</i>)}
        <form id={"ReplyPrompt" + EntryID} class="ReplyPrompt" style={{ display: "none" }}>
          <input id={"ReplyValue" + EntryID} class="ReplyValue" type="text" required />
          <input type="submit" class="ReplySubmit" value="Reply user" />
        </form>
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

  const [Comments, SetComments] = useState([]);

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
          if (isFirefox) {
            try {
              await LoginMan.writeComment(AnimeID, 0, input.value)
            } catch {
              await LoginMan.writeComment(AnimeID, 0, input.value)
            }
          } else {
            await LoginMan.writeComment(AnimeID, 0, input.value)
          }
        })
      }
    })();
  }, []);

  useEffect(() => {
    LoginMan.UserReactions()
      .then((response) => response.json())
      .then((reactions) => {
        GetComments(AnimeID)
          .then((response) => response.json())
          .then((result) => {
            let arr = []
            function commentbuilder(res, depth) {
              const options = {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              };
              let date_submitted = new Date(res.Submitted.Time)
              let reaction = 0

              if (LoginMan.LoggedIn()) {
                for (let r of reactions) {
                  if (r.CommentID == res.EntryID) {
                    if (r.Reaction == 1) {
                      reaction = -1
                    } else {
                      reaction = 1
                    }
                    break
                  }
                }
              }

              arr.push((<ChatEntry
                EntryID={res.EntryID}
                AnimeID={AnimeID}
                User={res.User}
                CommentText={res.CommentText}
                Depth={depth}
                Submitted={date_submitted.toLocaleDateString("en-EN", options)}
                Upvote={res.Upvotes}
                Downvote={res.Downvotes}
                Reaction={reaction}
              />))

              for (let rep of res.Replies) {
                commentbuilder(rep, depth + 1)
              }
            }

            for (let res of result) {
              commentbuilder(res, 0)
            }

            SetComments(arr)
          })
      })
  }, [])

  const ClearFunc = () => {
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
              <div id="InfoHeaderDiv"><h2 class="InfoHeader">Episodes:</h2>{LoginMan.LoggedIn() ? (<span id="clearhistory" onClick={ClearFunc}>clear history</span>) : (<></>)}</div>
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
          {Comments}
        </div>
      </div>
    </>
  );
}

export default AnimeInfo;
