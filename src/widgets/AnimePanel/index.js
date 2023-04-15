import React, {useEffect, useState} from 'react'
import { GetAnime } from '../../db_module'
import './style.scss';

function AnimePanel(props){

  const [AnimeTitle, SetAnimeTitle] = useState(0)
  const [AnimePoster, SetAnimePoster] = useState(0)
  const [Premiered, SetPremiered] = useState(0)
  const [EpisodeNum, SetEpisodeNum] = useState(0)
  const [AnimeType, SetAnimeType] = useState(0)
  const [AnimeGenres, SetAnimeGenres] = useState(0)
  const [AnimeThemes, SetAnimeThemes] = useState(0)
  const [AnimeStudios, SetAnimeStudios] = useState(0)
  const [AnimeProducers, SetAnimeProducers] = useState(0)
  const [AnimeDemographics, SetAnimeDemographics] = useState(0)

  function get_genre_str(arr){
    let res = "";

    for(let elem of arr){
      res += elem.Name + ", ";
    }

    if(res.length == 0){
      res = "None";
    }else if(res.length > 30){
      res = res.substring(0, 17) + "...";
    }

    return res;
  }
  
  useEffect(() =>{
    GetAnime(props.AnimeID)
    .then((response) => response.json())
    .then((result) =>{
      SetAnimeTitle(result.AnimeTitle);
      SetAnimePoster(result.PosterURL);
      SetPremiered(result.Premiered);
      SetEpisodeNum(result.EpisodeNum);
      SetAnimeGenres(get_genre_str(result.Genres));
      SetAnimeThemes(get_genre_str(result.Themes));
      SetAnimeStudios(get_genre_str(result.Studios));
      SetAnimeProducers(get_genre_str(result.Producers));
      SetAnimeDemographics(get_genre_str(result.Demographics));
      SetAnimeType(result.Type.Name)
    })
  }, []);

  return (
    <a href={'/anime/' + props.AnimeID.toString()}>
    <div class="AnimePanel">
      <div class="AnimePanelHover">
          <div class="AnimePanelHeader">
            <h1>{AnimeTitle}</h1>
          </div>
          <div class="AnimePanelContent">
            <div class="AnimePanelPosterDiv">
              <img class="AnimePanelImg" src={AnimePoster}></img>
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
            </table>
            <table class="AnimeTypePanel">
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
                  <td class="PropertyName">Studios:</td>
                  <td>{(AnimeStudios) ? AnimeStudios : "None"}</td>
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
    </a>
  )
}

export default AnimePanel