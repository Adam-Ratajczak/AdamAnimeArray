import React, {useEffect, useState, Component} from 'react'
import redirect from '../../redirect'
import { GetAnime, GetEpisodes, GetType } from '../../db_module'
import './style.scss';

function AnimePoster(props){

  const [AnimeTitle, SetAnimeTitle] = useState(0)
  const [AnimePoster, SetAnimePoster] = useState(0)
  const [Premiered, SetPremiered] = useState(0)
  const [EpisodeNum, SetEpisodeNum] = useState(0)
  const [AnimeTypeID, SetAnimeTypeID] = useState(0)
  const [AnimeType, SetAnimeType] = useState(0)
  
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
  
  // useEffect(() =>{
  //   GetType(AnimeTypeID)
  //   .then((response) => response.json())
  //   .then((result) =>{
  //     SetAnimeType(result.Name)
  //   })
  // }, []);

  let title = "";

  if(AnimeTitle.toString().length > 15){
    title = AnimeTitle.toString().substring(0, 12) + "...";
  }else{
    title = AnimeTitle;
  }

  document.addEventListener("click", (event)=>{
    redirect("anime/" + props.AnimeID.toString())

    event.preventDefault()
  });

  return (
    <div class="AnimePoster">
      <div class="AnimePosterHover">
          <div  class="AnimePosterHeader">
            <h1>{title}</h1>
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
  )
}

export default AnimePoster