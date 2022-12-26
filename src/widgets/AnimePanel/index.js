import React, {useEffect, useState, Tooltip} from 'react'
import redirect from '../../redirect'
import { GetAnime, GetDemographics, GetEpisodes, GetFilterEntry, GetGenre, GetProducer, GetType } from '../../db_module'
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

  // useEffect(() =>{
  //   GetFilterEntry(props.AnimeID)
  //   .then((response) => response.json())
  //   .then((result) =>{
  //     GetGenre()
  //     .then((response) => response.json())
  //     .then((genres) =>{
  //       let GenreStr = "";

  //       for(let i of result.Genres){
  //         GenreStr += genres[i].Name;
  //       }
  //       SetAnimeGenres(GenreStr);
  //     })

  //     GetTheme()
  //     .then((response) => response.json())
  //     .then((themes) =>{
  //       let ThemeStr = "";

  //       for(let i of result.Themes){
  //         ThemeStr += themes[i].Name;
  //       }
  //       SetAnimeThemes(ThemeStr);
  //     })

  //     GetProducer()
  //     .then((response) => response.json())
  //     .then((producers) =>{
  //       let ProducerStr = "";

  //       for(let i of result.Producers){
  //         ProducerStr += producers[i].Name;
  //       }
  //       SetAnimeProducers(ProducerStr);
  //     })

  //     GetDemographics()
  //     .then((response) => response.json())
  //     .then((demographics) =>{
  //       let DemographicsStr = "";

  //       for(let i of result.Demographics){
  //         DemographicsStr += demographics[i].Name;
  //       }
  //       SetAnimeDemographics(DemographicsStr);
  //     })

  //   })
  // }, []);
  
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
            <div class="AnimePosterDiv">
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
                  <td>{(AnimeGenres) ? AnimeType.toString() : "none"}</td>
                </tr>
                <tr>
                  <td class="PropertyName">Themes: </td>
                  <td>{(AnimeThemes) ? Premiered.toString() : "none"}</td>
                </tr>
                <tr>
                  <td class="PropertyName">Producers:</td>
                  <td>{(AnimeProducers) ? EpisodeNum.toString() : "none"}</td>
                </tr>
                <tr>
                  <td class="PropertyName">Demographics:</td>
                  <td>{(AnimeDemographics) ? EpisodeNum.toString() : "none"}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
  )
}

export default AnimePanel