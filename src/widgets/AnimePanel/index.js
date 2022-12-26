import React, {useEffect, useState, Tooltip} from 'react'
import redirect from '../../redirect'
import { GetAnime, GetAnimeDemographics, GetAnimeGenres, GetAnimeProducers, GetAnimeThemes, GetDemographics, GetEpisodes, GetFilterEntry, GetGenre, GetProducer, GetType } from '../../db_module'
import './style.scss';

function AnimePanel(props){

  const [AnimeTitle, SetAnimeTitle] = useState(0)
  const [AnimePoster, SetAnimePoster] = useState(0)
  const [Premiered, SetPremiered] = useState(0)
  const [EpisodeNum, SetEpisodeNum] = useState(0)
  const [AnimeTypeID, SetAnimeTypeID] = useState(0)
  const [AnimeType, SetAnimeType] = useState(0)
  const [AnimeGenres, SetAnimeGenres] = useState(0)
  const [AnimeThemes, SetAnimeThemes] = useState(0)
  const [AnimeProducers, SetAnimeProducers] = useState(0)
  const [AnimeDemographics, SetAnimeDemographics] = useState(0)
  
  useEffect(() =>{
    GetAnime(props.AnimeID)
    .then((response) => response.json())
    .then((result) =>{
      SetAnimeTitle(result.AnimeTitle);
      SetAnimePoster(result.PosterURL);
      SetPremiered(result.Premiered);
      SetAnimeTypeID(result.TypeID);
    })
  }, []);
  
  useEffect(() =>{
    GetEpisodes(props.AnimeID)
    .then((response) => response.json())
    .then((result) =>{
      SetEpisodeNum(result.length);
    })
  }, []);

  useEffect(() =>{
    GetAnimeGenres(props.AnimeID)
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
    GetAnimeThemes(props.AnimeID)
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
    GetAnimeProducers(props.AnimeID)
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
    GetAnimeDemographics(props.AnimeID)
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
  
  // useEffect(() =>{
  //   GetType(AnimeTypeID)
  //   .then((response) => response.json())
  //   .then((result) =>{
  //     SetAnimeType(result.Name)
  //   })
  // }, []);

  function redirection(){
    redirect('/anime/' + props.AnimeID.toString())
  }

  return (
    <div class="AnimePanel" onClick={redirection}>
      <div class="AnimePanelHover">
          <div class="AnimePanelHeader">
            <h1>{AnimeTitle}</h1>
          </div>
          <div class="AnimePanelContent">
            <div class="AnimePanelPosterDiv">
              <img class="AnimePanelImg" src={AnimePoster.toString()}></img>
            </div>
            <table class="AnimePanelInfo">
              <tbody>
                <tr>
                  <td class="PropertyName">Type: </td>
                  <td>{(AnimeType) ? AnimeType.toString() : "Unknown"}</td>
                </tr>
                <tr>
                  <td class="PropertyName">Premiered: </td>
                  <td>{(Premiered) ? Premiered.toString() : "Unknown"}</td>
                </tr>
                <tr>
                  <td class="PropertyName">Episodes:</td>
                  <td>{(EpisodeNum) ? EpisodeNum.toString() : "Unknown"}</td>
                </tr>
              </tbody>
            </table><table class="AnimeTypePanel">
              <tbody>
                <tr>
                  <td class="PropertyName">Genres: </td>
                  <td>{(AnimeGenres) ? AnimeGenres : "None"}</td>
                </tr>
                <tr>
                  <td class="PropertyName">Themes: </td>
                  <td>{(AnimeThemes) ? AnimeThemes : "None"}</td>
                </tr>
                <tr>
                  <td class="PropertyName">Producers:</td>
                  <td>{(AnimeProducers) ? AnimeProducers : "None"}</td>
                </tr>
                <tr>
                  <td class="PropertyName">Demographics:</td>
                  <td>{(AnimeDemographics) ? AnimeDemographics : "None"}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
  )
}

export default AnimePanel