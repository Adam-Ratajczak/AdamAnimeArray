import React, { useState, useEffect, useCallback } from 'react'
import { Menubar } from '../../widgets'
import { GetAnime, GetEpisodeLanguages, GetEpisodes, GetPlayers } from "../../db_module"
import redirect from '../../redirect'
import './style.scss';

function LangWidget(props) {
  const [Flags, SetFlags] = useState([])

  const AnimeID = props.AnimeID
  const EpNum = props.EpNum

  const foo = useCallback(() => {
    GetEpisodeLanguages(AnimeID, EpNum)
      .then((response) => response.json())
      .then((result) => {
        let flag_widget = []
        for (let lang of result) {
          flag_widget.push((<img src={process.env.PUBLIC_URL + "/flags/" + lang.FlagUrl} alt={lang.Name} class={lang.Code == props.Lang ? "active" : ""} role="button" />))
        }

        SetFlags(flag_widget)
      })
  })

  if (Flags.length == 0) {
    foo()
  }

  return (<div id="LanguageList">
    {Flags}
  </div>)
}

function PlayerCb(props) {
  const [Players, SetPlayers] = useState([])

  const AnimeID = props.AnimeID
  const EpNum = props.EpNum
  const Lang = props.Lang

  const foo = useCallback(() => {
    GetPlayers(AnimeID, EpNum, Lang)
      .then((response) => response.json())
      .then((result) => {
        let options = []
        for (let player of result) {
          options.push((<option value={player.PlayerUrl}>{player.Source + " - " + ((player.Quality) ? player.Quality : "Unknown")}</option>))
        }

        SetPlayers(options)
      })
  })

  if (Players.length == 0) {
    foo()
  }

  return (<select id="PlayerCb" onchange={props.onchange}>
    {Players}
  </select>)
}

function EpList(props) {
  const [Eps, SetEps] = useState([])

  const AnimeID = props.AnimeID
  const EpNum = props.EpNum

  useEffect(() => {
    if (Eps.length == 0) {
      GetEpisodes(AnimeID)
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

          for (let ep of to_sort) {
            let title = ep.Title
            if (title.length > 24) {
              title = title.substring(0, 21) + "..."
            }
            if (EpNum == ep.EpisodeNr) {
              list.push(<span class="EpisodeEntry"><span class="EpisodeNr">{ep.EpisodeNr}</span><span>{title}</span></span>)
            } else {
              list.push(<a class="EpisodeEntry" href={"/anime/" + AnimeID + "/ep/" + ep.EpisodeNr}><span class="EpisodeNr">{ep.EpisodeNr}</span><span>{title}</span></a>)
            }
          }
          SetEps(list)
        })
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
  const AnimeID = window.location.href.split("/").at(-3);
  const EpNum = window.location.href.split("/").at(-1);

  const [AnimeTitle, SetAnimeTitle] = useState(0)
  const [EpisodeTitle, SetEpisodeTitle] = useState(0)
  const [Aired, SetAired] = useState(0)
  const [PlayerUrl, SetPlayerUrl] = useState("/NoPlayer")
  const [CurrLang, SetCurrLang] = useState("pl")
  const [CurrPlayer, SetCurrPlayer] = useState("")
  const [CurrQuality, SetCurrQuality] = useState("")

  useEffect(() => {
    GetAnime(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        SetAnimeTitle(result.AnimeTitle);
      })
  }, []);

  useEffect(() => {
    GetEpisodes(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        if (EpNum > result.length) {
          redirect("/anime/" + AnimeID);
        }
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

  useEffect(() => {
    let cb = document.getElementById("PlayerCb")

    GetPlayers(AnimeID, EpNum)
      .then((response) => response.json())
      .then((result) => {
        if (result.length > 0) {
          SetPlayerUrl(result[0].PlayerUrl)
          SetCurrLang(result[0].LangCode)
        }
      })
    cb.onchange = (ev) => {
      let player_url = cb.options[cb.selectedIndex].value
      let player = cb.options[cb.selectedIndex].text
      SetPlayerUrl(player_url)
      SetCurrPlayer(player.split(" - ")[0])
      SetCurrQuality(player.split(" - ")[1])
    }

    let all_flags = document.querySelectorAll("#LanguageList img")

    for (let i = 0; i < all_flags.length; i++) {
      all_flags[i].onclick = () => {
        GetEpisodeLanguages(AnimeID, EpNum)
          .then((response) => response.json())
          .then((result) => {
            SetCurrLang(result[i].Code)

            for (let img of all_flags) {
              img.classList.remove("active")
            }

            all_flags[i].classList.add("active")
          })
      }
    }
  }, []);

  return (
    <div id="main">
      <Menubar />
      <div id="AnimeInfoHeaderDiv"><h1>{AnimeTitle}</h1><LangWidget AnimeID={AnimeID} EpNum={EpNum} Lang={CurrLang} /></div>
      <div id="PlayerContent">
        <EpList AnimeID={AnimeID} EpNum={EpNum} />
        <div id="PlayerMainDiv">
          <div id="PlayerDiv">
            <iframe id="Player" src={PlayerUrl} />
            <div id="PlayerInfoDiv">
              <table>
                <tbody>
                  <tr><th>Title:</th><td>{EpisodeTitle}</td></tr>
                  <tr><th>Aired:</th><td>{(Aired.Valid) ? (EpAired.toLocaleDateString("en-EN", options)) : "Unknown"}</td></tr>
                  <tr><th>Lang:</th><td>{CurrLang}</td></tr>
                  <tr><th>Player:</th><td>{CurrPlayer}</td></tr>
                  <tr><th>Quality:</th><td>{CurrQuality}</td></tr>
                </tbody>
              </table>
              <a href={"/anime/" + AnimeID.toString()}>Back to anime info...</a>
            </div>
          </div>
          <div id="PlayerFooter">
            <label>Choose Player:<PlayerCb AnimeID={AnimeID} EpNum={EpNum} Lang={CurrLang} /></label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimePlayer