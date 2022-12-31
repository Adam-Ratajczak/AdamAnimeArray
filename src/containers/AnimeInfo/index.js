import React, { useState, useEffect } from 'react'
import {Menubar} from '../../widgets'
import {GetAnime, GetAnimeDemographics, GetAnimeGenres, GetAnimeProducers, GetAnimeThemes, GetAnimeType, GetEpisodes} from "../../db_module"
import redirect from '../../redirect'
import './style.scss';

function AnimeInfo(){
  const AnimeID = window.location.href.split("/").at(-1);

  const [AnimeTitle, SetAnimeTitle] = useState(0)
  const [AnimeDesc, SetAnimeDesc] = useState(0)
  const [AiredBegin, SetAiredBegin] = useState(0)
  const [AiredEnd, SetAiredEnd] = useState(0)
  const [AnimePoster, SetAnimePoster] = useState(0)
  const [Premiered, SetPremiered] = useState(0)
  const [EpisodeNum, SetEpisodeNum] = useState(0)
  const [AnimeType, SetAnimeType] = useState(0)
  const [AnimeGenres, SetAnimeGenres] = useState(0)
  const [AnimeThemes, SetAnimeThemes] = useState(0)
  const [AnimeProducers, SetAnimeProducers] = useState(0)
  const [AnimeDemographics, SetAnimeDemographics] = useState(0)
  
  useEffect(() =>{
    GetAnime(AnimeID)
    .then((response) => response.json())
    .then((result) =>{
      SetAnimeTitle(result.AnimeTitle);
      SetAnimeDesc(result.AnimeDesc);
      SetAiredBegin(result.AiredBegin);
      SetAiredEnd(result.AiredEnd);
      SetAnimePoster(result.PosterURL);
      SetPremiered(result.Premiered);
    })
  }, []);
  
  useEffect(() =>{
    GetEpisodes(AnimeID)
    .then((response) => response.json())
    .then((result) =>{
      SetEpisodeNum(result.length);
    })
  }, []);

  useEffect(() =>{
    GetAnimeGenres(AnimeID)
    .then((response) => response.json())
    .then((result) =>{
      let res = "";

      for(let elem of result){
        res += elem.Name + ", ";
      }

      if(res.length == 0){
        res = "None";
      }

      SetAnimeGenres(res);
    })
  }, []);

  useEffect(() =>{
    GetAnimeThemes(AnimeID)
    .then((response) => response.json())
    .then((result) =>{
      let res = "";

      for(let elem of result){
        res += elem.Name + ", ";
      }

      if(res.length == 0){
        res = "None";
      }

      SetAnimeThemes(res);
    })
  }, []);

  useEffect(() =>{
    GetAnimeProducers(AnimeID)
    .then((response) => response.json())
    .then((result) =>{
      let res = "";

      for(let elem of result){
        res += elem.Name + ", ";
      }

      if(res.length == 0){
        res = "None";
      }

      SetAnimeProducers(res);
    })
  }, []);

  useEffect(() =>{
    GetAnimeDemographics(AnimeID)
    .then((response) => response.json())
    .then((result) =>{
      let res = "";

      for(let elem of result){
        res += elem.Name + ", ";
      }

      if(res.length == 0){
        res = "None";
      }

      SetAnimeDemographics(res);
    })
  }, []);
  
  useEffect(() =>{
    GetAnimeType(AnimeID)
    .then((response) => response.json())
    .then((result) =>{
      SetAnimeType(result.Name)
    })
  }, []);
  
  const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

  const ABegin = new Date(AiredBegin.Time);
  const AEnd = new Date(AiredEnd.Time);
  
  return (
    <div id="main">
      <Menubar/>
      <div id="AnimeInfoContent">
        <div id="AnimeInfoContainer">
        <h1 id="AnimeInfoHeader">{AnimeTitle}</h1>
          <h3 class="InfoHeader">General information:</h3>
          <table>
            <tbody>
              <tr>
                <td class="PropertyName">Type: </td>
                <td>{(AnimeType) ? AnimeType.toString() : "Unknown"}</td>
              </tr>
              <tr>
                <td class="PropertyName">Episodes: </td>
                <td>{(EpisodeNum) ? EpisodeNum.toString() : "Unknown"}</td>
              </tr>
              <tr>
                <td class="PropertyName">Premiered: </td>
                <td>{(Premiered) ? Premiered.toString() : "Unknown"}</td>
              </tr>
              <tr>
                <td class="PropertyName">Aired: </td>
                <td>{(AiredBegin.Valid) ? ABegin.toLocaleDateString("en-EN", options) : "Unknown"}</td>
              </tr>
              <tr>
                <td class="PropertyName">Finished: </td>
                <td>{(AiredEnd.Valid) ? AEnd.toLocaleDateString("en-EN", options) : "Unknown"}</td>
              </tr>
            </tbody>
          </table>

          <h3 class="InfoHeader">Anime type:</h3>
          <table>
            <tbody>
              <tr>
                <td class="PropertyName">Genres: </td>
                <td>{(AnimeGenres != "") ? AnimeGenres.toString() : "None"}</td>
              </tr>
              <tr>
                <td class="PropertyName">Themes: </td>
                <td>{(AnimeThemes != "") ? AnimeThemes.toString() : "None"}</td>
              </tr>
              <tr>
                <td class="PropertyName">Producers: </td>
                <td>{(AnimeProducers != "") ? AnimeProducers.toString() : "None"}</td>
              </tr>
              <tr>
                <td class="PropertyName">Demographics: </td>
                <td>{(AnimeDemographics != "") ? AnimeDemographics.toString() : "None"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="AnimeDescContainer">
          <div id="AnimeInfoPosterContainer">
            <img src={AnimePoster} id="AnimeInfoPoster"/>
          </div>
          <div>
            {AnimeDesc.toString().split("<br>").map(line => {return <p>{line}</p>})}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimeInfo