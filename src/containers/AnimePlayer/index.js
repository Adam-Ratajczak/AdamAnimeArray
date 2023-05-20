import React, { useState, useEffect, useCallback } from 'react'
import { Menubar } from '../../widgets'
import { GetAnime, GetEpisodeLanguages, GetEpisodes, GetPlayers, GetSongs, ChangeProgress, GetProgress } from "../../db_module"
import redirect from '../../redirect'
import './style.scss';
import LoginMan from '../../login_manager';

function LangWidget(props) {
  const [Flags, SetFlags] = useState([])
  const [Reload, SetReload] = useState(true)

  const AnimeID = props.AnimeID
  const EpNum = props.EpNum

  const foo = useCallback(() => {
    GetEpisodeLanguages(AnimeID, EpNum)
      .then((response) => response.json())
      .then((result) => {

        let flag_widget = []
        for (let lang of result) {
          function eventHandler() {
            let i = 0
            while (i < result.length) {
              if (lang.Code == result[i].Code) {
                break
              }
              i++
            }
            props.OnClick(lang.Code)
            let img = document.querySelectorAll("#LanguageList img")

            for (let image of img) {
              image.classList.remove("active")
            }

            img[i].classList.add("active")
          }

          flag_widget.push((
            <div class="tooltip">
              <span class="tooltiptext">{lang.Name}</span>
              <img onClick={(ev) => eventHandler()} src={process.env.PUBLIC_URL + "/flags/" + lang.FlagUrl} alt={lang.Code} class={lang.Code == props.Lang ? "active" : ""} role="button" />
            </div>
          ))
        }

        SetFlags(flag_widget)
        SetReload(false)
      })
  })

  if (Reload) {
    foo()
  }

  return (<div id="LanguageList">
    {Flags}
  </div>)
}

function EpList(props) {
  const [Eps, SetEps] = useState([])

  const AnimeID = parseInt(props.AnimeID)
  const EpNum = parseInt(props.EpNum)

  useEffect(() => {
    (async () => {
      await ChangeProgress(LoginMan.Token(), parseInt(AnimeID), parseInt(EpNum), 0)

      let Progress = []

      await GetProgress(LoginMan.Token(), parseInt(AnimeID))
        .then((response) => response.json())
        .then((result) => {
          Progress = result
        }).catch(() => { })

      await GetEpisodes(AnimeID)
        .then((response) => response.json())
        .then((result) => {
          let to_sort = result;
          let list = []
          to_sort.sort((a, b) => {
            if (a.EpisodeNr < b.EpisodeNr) {
              return -1
            } else if (a.EpisodeNr == b.EpisodeNr) {
              return 0
            } else {
              return 1
            }
          })

          let i = 0
          for (let ep of to_sort) {
            let color = "transparent"

            if (Progress.length > 0) {
              if (Progress[i] == 0) {
                color = "transparent"
              } else if (Progress[i] == 1) {
                color = "#FFFF0044"
              } else if (Progress[i] == 2) {
                color = "#00FF0044"
              }
            }

            let title = ep.Title
            list.push(<a class={"EpisodeEntry tooltip HeaderHover"} href={"/anime/" + AnimeID + "/ep/" + ep.EpisodeNr}><span class="tooltiptext">{ep.Title}</span><span class={"EpisodeNr" + (i + 1 == EpNum ? " SelectedEpNr" : "")}>{ep.EpisodeNr}</span><span class="EpTitle" style={{ backgroundColor: color }}>{title}</span></a>)
            i++
            SetEps(list)
          }
        })
    })()
  }, [])

  useEffect(() => {
    let eplist = document.querySelector("#EpList > div")
    let sc = EpNum * 40 - eplist.clientHeight / 2
    if (sc > 0) {
      eplist.scrollTop = sc
    }
  })

  return (
    <div id="EpList">
      <h2>Episodes: </h2>
      <div>
        {Eps}
      </div>
    </div>
  )
}

function AnimePlayer() {
  const AnimeID = parseInt(window.location.href.split("/").at(-3));
  const EpNum = parseInt(window.location.href.split("/").at(-1));

  const [AnimeTitle, SetAnimeTitle] = useState(0)
  const [EnglishTitle, SetEnglishTitle] = useState(0)
  const [EpisodeTitle, SetEpisodeTitle] = useState(0)
  const [EpisodeControls, SetEpisodeControls] = useState(0)
  const [EpisodeAdminControls, SetEpisodeAdminControls] = useState(0)
  const [Aired, SetAired] = useState(0)
  const [Songs, SetSongs] = useState([])
  const [PlayerUrl, SetPlayerUrl] = useState("/NoPlayer")
  const [CurrLang, SetCurrLang] = useState("")
  const [CurrPlayer, SetCurrPlayer] = useState("")
  const [CurrQuality, SetCurrQuality] = useState("")
  const [Reported, SetReported] = useState("")

  useEffect(() => {
    if (LoginMan.LoggedIn()) {
      document.getElementById("IframeWrapper").onclick = () => {
        ChangeProgress(LoginMan.Token(), parseInt(AnimeID), parseInt(EpNum), 1)
        document.getElementById("Player").style.pointerEvents = "all"
        document.querySelector(".SelectedEpNr + .EpTitle").style.backgroundColor = "#00FF0044"
      }

    }
  }, [])

  useEffect(() => {
    GetAnime(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        SetAnimeTitle(result.AnimeTitle);
        SetEnglishTitle(result.EnglishTitle);

        if (result.EnglishTitle == "") {
          document.getElementById("EpList").style.height = (document.body.clientHeight - 50).toString() + "px"
        } else {
          document.getElementById("EpList").style.height = (document.body.clientHeight - 90).toString() + "px"
        }

        if (EpNum > result.EpisodeNum) {
          redirect("/anime/" + AnimeID);
        }

        SetEpisodeControls(
          result.EpisodeNum > 1 ? (<div class="EpControls">
            {EpNum != 1 ? (<a href={"/anime/" + AnimeID + "/ep/" + (EpNum - 1).toString()} style={{ backgroundColor: "red", width: "140px" }}>Previous Episode</a>) : (<a style={{ backgroundColor: "gray", width: "140px" }}>Previous Episode</a>)}
            {EpNum != result.EpisodeNum ? (<a href={"/anime/" + AnimeID + "/ep/" + (EpNum + 1).toString()} style={{ backgroundColor: "green", width: "140px" }}>Next Episode</a>) : (<a style={{ backgroundColor: "gray", width: "140px" }}>Next Episode</a>)}
          </div>) : (<></>)
        )
      })
  }, []);

  useEffect(() => {
    GetEpisodes(AnimeID, EpNum)
      .then((response) => response.json())
      .then((result) => {
        SetEpisodeTitle(result.Title);
        SetAired(result.Aired);
      })
  }, []);

  const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

  const EpAired = new Date(Aired.Time);

  function changeLang(LangID) {
    SetCurrLang(LangID)

    let cb = document.getElementById("PlayerCb")

    cb.innerHTML = ""
    GetPlayers(AnimeID, EpNum, LangID)
      .then((response) => response.json())
      .then((result) => {
        SetPlayerUrl(result[0].PlayerUrl)
        for (let player of result) {
          cb.innerHTML += "<option value=\"" + player.PlayerUrl + ";" + player.PlayerID + "\">" + player.Source + " - " + ((player.Quality) ? player.Quality : "Unknown") + "</option>"
        }
      })
  }

  useEffect(() => {
    let cb = document.getElementById("PlayerCb")

    GetPlayers(AnimeID, EpNum)
      .then((response) => response.json())
      .then((result) => {
        result.sort((a, b) => {
          if (a.LangCode < b.LangCode) {
            return -1
          } else if (a.LangCode == b.LangCode) {
            return 0
          } else {
            return 1
          }
        })
        if (result.length > 0) {
          changeLang(result[0].LangCode)
          SetCurrPlayer(result[0].Source)
          SetCurrQuality(result[0].Quality)

          if (LoginMan.LoggedIn()) {
            (async () => {
              const reported = await LoginMan.getReported();

              if (reported.Players.indexOf(result[0].PlayerID) != -1) {
                document.getElementById("ReportPlayerBtn").style.backgroundColor = "gray";
              } else {
                document.getElementById("ReportPlayerBtn").style.backgroundColor = "gold";
              }
            })()
          }

          let img = document.querySelectorAll("#LanguageList img")[0]

          img.classList.add("active")
        }

        if (LoginMan.LoggedIn()) {
          LoginMan.getReported()
            .then((response) => response.json())
            .then((result) => {
              SetReported(result.Players)
              function reportPlayer() {
                let player_data = cb.options[cb.selectedIndex].value
                let PlayerID = parseInt(player_data.split(";")[1])
                if (result.Players.indexOf(PlayerID) == -1) {
                  document.getElementsByClassName("OverlayContainer")[1].style.display = "flex"
                  document.getElementsByClassName("FormContainer")[1].style.display = "flex"
                }
              }

              let player_data = cb.options[cb.selectedIndex].value
              let PlayerID = parseInt(player_data.split(";")[1])
              SetEpisodeAdminControls((
                <div class="EpControls">
                  <a onClick={reportPlayer} id="ReportPlayerBtn" style={{ backgroundColor: result.Players.indexOf(PlayerID) == -1 ? "gold" : "gray", width: "300px" }}>Report player</a>
                </div>
              ))

              document.getElementById("ReportPlayer").addEventListener("submit", (ev) => {
                let cb = document.getElementById("PlayerCb")
                let player_data = cb.options[cb.selectedIndex].value
                let PlayerID = parseInt(player_data.split(";")[1])

                LoginMan.reportPlayer(PlayerID, document.getElementById("ReportMsg").Value)
                // ev.preventDefault()
              })
            })
        }
      })

    cb.onchange = (ev) => {
      let player_data = cb.options[cb.selectedIndex].value
      let player = cb.options[cb.selectedIndex].text
      SetPlayerUrl(player_data.split(";")[0])
      SetCurrPlayer(player.split(" - ")[0])
      SetCurrQuality(player.split(" - ")[1])

      if (LoginMan.LoggedIn()) {
        let PlayerID = parseInt(player_data.split(";")[1])
        LoginMan.getReported()
          .then((response) => response.json())
          .then((result) => {
            if (result.Players.indexOf(PlayerID) != -1) {
              document.getElementById("ReportPlayerBtn").style.backgroundColor = "gray";
            } else {
              document.getElementById("ReportPlayerBtn").style.backgroundColor = "gold";
            }
          })
      }
    }
  }, []);

  useEffect(() => {
    document.getElementById("EpSongs").onclick = () => {
      document.getElementsByClassName("OverlayContainer")[0].style.display = "flex"
      document.getElementsByClassName("FormContainer")[0].style.display = "flex"
    }
    const exits = document.getElementsByClassName("Exit")
    for (let i = 0; i < exits.length; i++) {
      document.getElementsByClassName("Exit")[i].onclick = () => {
        document.getElementsByClassName("OverlayContainer")[i].style.display = "none"
        document.getElementsByClassName("FormContainer")[i].style.display = "none"
      }
    }

    GetSongs(AnimeID, EpNum)
      .then((response) => response.json())
      .then((result) => {
        if (result.length == 0) {
          document.getElementById("EpSongs").style.display = "none"
        }

        let arr = []

        for (let elem of result) {
          arr.push((
            <tr>
              <td>{elem.Title}</td>
              <td>{elem.Artist}</td>
              <td>{elem.Type}</td>
            </tr>
          ))

          let players = []

          for (let p of elem.Players) {
            players.push((<span><a class="MusicLink" href={p.PlayerUrl} target="_blank">{p.Source.charAt(0).toUpperCase() + p.Source.slice(1)}</a>, </span>))
          }

          if (elem.Players.length == 0) {
            arr.push((<tr><td style={{ textAlign: "center" }} colSpan="3">No player information provided for this track!</td></tr>))
          } else {
            arr.push((<tr><th>Players:</th><td colSpan={2}>{players}</td></tr>))
          }
        }

        SetSongs(arr)
      })
  }, [])

  return (
    <div id="main">
      <Menubar />
      <div id="AnimeInfoHeaderDiv"><h1>{AnimeTitle}<br /><i>{EnglishTitle}</i></h1><LangWidget AnimeID={AnimeID} EpNum={EpNum} Lang={CurrLang} OnClick={changeLang} /></div>
      <div id="PlayerContent">
        <EpList AnimeID={AnimeID} EpNum={EpNum} />
        <div id="PlayerMainDiv">
          <div id="PlayerDiv">
            {LoginMan.LoggedIn() ? (
              <div id="IframeWrapper">
                <iframe id="Player" src={PlayerUrl} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" />
              </div>
            ) : (
              <iframe id="Player" src={PlayerUrl} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" />
            )}

            <label><span>Choose Player:</span><select id="PlayerCb" class="minimal"></select></label>
          </div>
          <div id="PlayerInfoDiv">
            <table>
              <tbody>
                <tr><th>Title:</th><td>{EpisodeTitle}</td></tr>
                <tr><th>Aired:</th><td>{(Aired.Time != "0001-01-01T00:00:00Z") ? (EpAired.toLocaleDateString("en-EN", options)) : "Unknown"}</td></tr>
                <tr><th>Lang:</th><td>{CurrLang}</td></tr>
                <tr><th>Player:</th><td>{CurrPlayer}</td></tr>
                <tr><th>Quality:</th><td>{CurrQuality}</td></tr>
              </tbody>
            </table>
            <a href={"/anime/" + AnimeID.toString()}>Back to anime info...</a>
            <a id="EpSongs">Show episode opening / ending</a>
            {EpisodeControls}
            {EpisodeAdminControls}
          </div>
        </div>
      </div>

      <div class="OverlayContainer">
        <div class="FormContainer">
          <h1 class="Exit">X</h1>
          <table>
            <tbody>
              <tr><th>Title:</th><th>Artist:</th><th>Type:</th></tr>
              {Songs}
            </tbody>
          </table>
        </div>
      </div>

      {LoginMan.LoggedIn() ? (<div class="OverlayContainer">
        <div class="FormContainer">
          <h1 class="Exit">X</h1>
          <form id="ReportPlayer">
            <h2>Report player:</h2>
            <textarea id="ReportMsg" name="ReportMsg" rows="4" cols="64" placeholder="Write what's wrong with this player" required style={{ resize: "none" }} /><br />
            <input type="submit" value="report" />
          </form>
        </div>
      </div>) : (<></>)}
    </div>
  )
}

export default AnimePlayer