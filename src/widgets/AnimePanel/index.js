import React, { useEffect, useState } from 'react'
import './style.scss';
import { applyEffect } from 'fluent-reveal-effect';

function AnimePanel(props) {
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

  function get_genre_str(arr) {
    let res = "";

    for (let elem of arr) {
      res += elem.Name + ", ";
    }

    if (res.length == 0) {
      res = "None";
    }

    return res;
  }

  useEffect(() => {
    SetAnimeTitle(props.Anime.AnimeTitle);
    SetAnimePoster(props.Anime.PosterURL);
    SetPremiered(props.Anime.Premiered);
    SetEpisodeNum(props.Anime.EpisodeNum);
    SetAnimeGenres(get_genre_str(props.Anime.Genres));
    SetAnimeThemes(get_genre_str(props.Anime.Themes));
    SetAnimeStudios(get_genre_str(props.Anime.Studios));
    SetAnimeProducers(get_genre_str(props.Anime.Producers));
    SetAnimeDemographics(get_genre_str(props.Anime.Demographics));
    SetAnimeType(props.Anime.Type.Name)

    applyEffect('.AnimePanelHover', {
      // clickEffect: true,
      lightColor: 'rgba(255,255,255,0.6)',
      gradientSize: 80,
      isContainer: true,
      children: {
        borderSelector: '.btn-border',
        elementSelector: '.btn',
        lightColor: 'rgba(255,255,255,0.3)',
        gradientSize: 150
      }
    });
  }, [])

  return (
    <a href={'/anime/' + props.Anime.AnimeID.toString()}>
      <div class="AnimePanel">
        <img class="AnimePanelImg" src={AnimePoster}></img>
        <div class="AnimePanelHover">
          <div class="AnimePanelHeader">
            <h1>{AnimeTitle}</h1>
          </div>
          <div class="AnimePanelContent btn">
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