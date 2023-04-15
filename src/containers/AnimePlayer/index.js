import React, { useState, useEffect, useCallback } from 'react'
import { Menubar } from '../../widgets'
import { GetAnime, GetEpisodeLanguages, GetEpisodes, GetPlayers } from "../../db_module"
import redirect from '../../redirect'
import './style.scss';

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
          function eventHandler(){
            let i = 0
            while(i < result.length){
              if(lang.Code == result[i].Code){
                break
              }
              i++
            }
            props.OnClick(lang.Code)
            let img = document.querySelectorAll("#LanguageList img")

            for(let image of img){
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
              list.push(<span class="EpisodeEntry tooltip"><span class="tooltiptext">{ep.Title}</span><span class="EpisodeNr">{ep.EpisodeNr}</span><span>{title}</span></span>)
            } else {
              list.push(<a class="EpisodeEntry tooltip" href={"/anime/" + AnimeID + "/ep/" + ep.EpisodeNr}><span class="tooltiptext">{ep.Title}</span><span class="EpisodeNr">{ep.EpisodeNr}</span><span>{title}</span></a>)
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
  const [EnglishTitle, SetEnglishTitle] = useState(0)
  const [EpisodeTitle, SetEpisodeTitle] = useState(0)
  const [Aired, SetAired] = useState(0)
  const [PlayerUrl, SetPlayerUrl] = useState("/NoPlayer")
  const [CurrLang, SetCurrLang] = useState("")
  const [CurrPlayer, SetCurrPlayer] = useState("")
  const [CurrQuality, SetCurrQuality] = useState("")

  useEffect(() => {
    GetAnime(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        SetAnimeTitle(result.AnimeTitle);
        SetEnglishTitle(result.EnglishTitle);
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

  function changeLang(LangID){
    SetCurrLang(LangID)
    
    let cb = document.getElementById("PlayerCb")

    cb.innerHTML = ""
    GetPlayers(AnimeID, EpNum, LangID)
      .then((response) => response.json())
      .then((result) => {
        SetPlayerUrl(result[0].PlayerUrl)
        for (let player of result) {
          cb.innerHTML += "<option value=\"" + player.PlayerUrl + "\">" + player.Source + " - " + ((player.Quality) ? player.Quality : "Unknown") + "</option>"
        }
      })
  }

  useEffect(() => {
    let cb = document.getElementById("PlayerCb")

    GetPlayers(AnimeID, EpNum)
      .then((response) => response.json())
      .then((result) => {
        result.sort((a, b) => {
          if(a.LangCode < b.LangCode){
            return -1
          }else if(a.LangCode == b.LangCode){
            return 0
          }else{
            return 1
          }
        })
        if (result.length > 0) {
          changeLang(result[0].LangCode)
          SetCurrPlayer(result[0].Source)
          SetCurrQuality(result[0].Quality)
          
          let img = document.querySelectorAll("#LanguageList img")[0]

          img.classList.add("active")
        }
      })
    cb.onchange = (ev) => {
      let player_url = cb.options[cb.selectedIndex].value
      let player = cb.options[cb.selectedIndex].text
      SetPlayerUrl(player_url)
      SetCurrPlayer(player.split(" - ")[0])
      SetCurrQuality(player.split(" - ")[1])
    }
  }, []);

  return (
    <div id="main">
      <Menubar />
      <div id="AnimeInfoHeaderDiv"><h1>{AnimeTitle}<br/><i>{EnglishTitle}</i></h1><LangWidget AnimeID={AnimeID} EpNum={EpNum} Lang={CurrLang} OnClick={changeLang} /></div>
      <div id="PlayerContent">
        <EpList AnimeID={AnimeID} EpNum={EpNum} />
        <div id="PlayerMainDiv">
          <div id="PlayerDiv">
            <iframe id="Player" src={PlayerUrl} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" />
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
            <label>Choose Player:<select id="PlayerCb" class="minimal"></select></label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimePlayer