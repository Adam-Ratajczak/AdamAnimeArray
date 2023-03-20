import React, { useState, useEffect } from 'react'
import {Menubar, EpisodeBtn} from '../../widgets'
import {GetAnime, GetEpisodes,} from "../../db_module"
import redirect from '../../redirect'
import './style.scss';
import { NavLink } from "react-router-dom";

function AnimePlayer(){
  const AnimeID = window.location.href.split("/").at(-3);
  const EpNum = window.location.href.split("/").at(-1);

  const [AnimeTitle, SetAnimeTitle] = useState(0)
  const [EpisodeTitle, SetEpisodeTitle] = useState(0)
  const [Aired, SetAired] = useState(0)
  const [PlayerUrl, SetPlayerUrl] = useState(0)
  const [EpisodeNum, SetEpisodeNum] = useState(0)
  
  useEffect(() =>{
    GetAnime(AnimeID)
    .then((response) => response.json())
    .then((result) =>{
      SetAnimeTitle(result.AnimeTitle);
    })
  }, []);
  
  useEffect(() =>{
    GetEpisodes(AnimeID)
    .then((response) => response.json())
    .then((result) =>{
      if(EpNum > result.length){
        redirect("/anime/" + AnimeID);
      }
      
      SetEpisodeNum(result.length);
    })
  }, []);
  
  useEffect(() =>{
    GetEpisodes(AnimeID, EpNum)
    .then((response) => response.json())
    .then((result) =>{
      SetEpisodeTitle(result.Title);
      SetAired(result.Aired);
      SetPlayerUrl(result.PlayerUrl);
    })
  }, []);
  
  const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

  const EpAired = new Date(Aired.Time);
  
  return (
    <div id="main">
      <Menubar/>
      <div id="PlayerContent">
        <div id="PlayerHeaders">
          <NavLink to={"/anime/" + AnimeID}><h1>{AnimeTitle + " (ep. " + EpNum + ")"}</h1></NavLink>
          <p><q>{EpisodeTitle}</q> {(Aired.Valid) ? (" - " + EpAired.toLocaleDateString("en-EN", options)) : ""}</p>
        </div>
        <iframe id="Player" title="Player" src={PlayerUrl} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
      </div>
      <div id="EpisodeList">
        <div id="EpisodeBtnWidget">
          <EpisodeBtn AnimeID={AnimeID} EpisodeNum={EpNum} EpisodeCount={EpisodeNum}/>
        </div>
      </div>
    </div>
  )
}

export default AnimePlayer
