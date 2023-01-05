import React, {useEffect, useState} from 'react'
import { GetAnime, GetEpisodes, GetAnimeType } from '../../db_module'
import './style.scss';

function AnimePoster(props){

  const [AnimeTitle, SetAnimeTitle] = useState(0)
  const [AnimePoster, SetAnimePoster] = useState(0)
  const [Premiered, SetPremiered] = useState(0)
  const [EpisodeNum, SetEpisodeNum] = useState(0)
  const [AnimeType, SetAnimeType] = useState(0)
  
  useEffect(() =>{
    GetAnime(props.AnimeID)
    .then((response) => response.json())
    .then((result) =>{
      SetAnimeTitle(result.AnimeTitle);
      SetAnimePoster(result.PosterURL);
      SetPremiered(result.Premiered);
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
    GetAnimeType(props.AnimeID)
    .then((response) => response.json())
    .then((result) =>{
      SetAnimeType(result.Name)
    })
  }, []);

  let short_title = "";

  if(AnimeTitle.toString().length > 15){
    short_title = AnimeTitle.toString().substring(0, 12) + "...";
  }else{
    short_title = AnimeTitle;
  }

  return (
    <a href={'/anime/' + props.AnimeID.toString()}>
    <div class="AnimePoster">
      <div class="AnimePosterHover">
          <div class="AnimePosterHeader tooltip">
          <span class="tooltiptext">{AnimeTitle}</span>
            <h1>{short_title}</h1>
          </div>
          <div class="AnimePosterDiv">
            <img class="AnimePosterImg" src={AnimePoster.toString()}></img>
          </div>
          <table class="AnimePosterInfo">
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
          </table>
      </div>
    </div>
    </a>
  )
}

export default AnimePoster