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
          flag_widget.push((<input type="radio" name="LanguageList"><img src={process.env.PUBLIC_URL + "/flags/" + lang.FlagUrl} alt={lang.Name} /></input>))
        }

        SetFlags(flag_widget)
      })
  })

  if (Flags.length == 0) {
    foo()
  }

  return (<fieldset id="LanguageList">
    {/* {Flags} */}
  </fieldset>)
}

function PlayerCb(props){
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
          options.push((<option value={player.PlayerUrl}>{player.Source + " - " + player.Quality}</option>))
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

function AnimePlayer() {
  const AnimeID = window.location.href.split("/").at(-3);
  const EpNum = window.location.href.split("/").at(-1);

  const [AnimeTitle, SetAnimeTitle] = useState(0)
  const [EpisodeTitle, SetEpisodeTitle] = useState(0)
  const [Aired, SetAired] = useState(0)
  const [PlayerUrl, SetPlayerUrl] = useState(0)
  const [CurrLang, SetCurrLang] = useState("")

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

  useEffect(() =>{
    GetPlayers(AnimeID, EpNum)
    .then((response) => response.json())
    .then((result) => {
      if(result.length > 0){
        SetPlayerUrl(result[0].PlayerUrl)
        SetCurrLang(result[0].LangCode)
      }else{

      }
    })

    let cb = document.getElementById("PlayerCb")
    cb.onchange = (ev) =>{
      let player_url = cb.options[cb.selectedIndex].value
      SetPlayerUrl(player_url)
    }
  }, []);

  return (
    <div id="main">
      <Menubar />
      <div id="PlayerContent">
        <div id="PlayerHeaders">
          <a href={"/anime/" + AnimeID}><h1>{AnimeTitle + " (ep. " + EpNum + ")"}</h1></a>
          <p><q>{EpisodeTitle}</q> {(Aired.Valid) ? (" - " + EpAired.toLocaleDateString("en-EN", options)) : ""}</p>
        </div>
        <iframe id="Player" title="Player" src={PlayerUrl} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        <div id="PlayerLink">
          <LangWidget AnimeID={AnimeID} EpNum={EpNum} />
          <PlayerCb AnimeID={AnimeID} EpNum={EpNum} Lang={CurrLang} />
        </div>
      </div>
    </div>
  )
}

export default AnimePlayer