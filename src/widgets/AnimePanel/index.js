import React, { useEffect, useState } from 'react'
import './style.scss';
import { applyEffect } from 'fluent-reveal-effect';

function AnimePanel(props) {
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
        <img class="AnimePanelImg" src={props.Anime.PosterURL}></img>
        <div class="AnimePanelHover">
          <div class="AnimePanelHeader">
            <h1>{props.Anime.AnimeTitle}</h1>
          </div>
          <div class="AnimePanelContent btn">
            <table class="AnimePanelInfo">
              <tbody>
                <tr>
                  <td class="PropertyName">Type: </td>
                  <td>{(props.Anime.Type.Name) ? props.Anime.Type.Name.toString() : "Unknown"}</td>
                </tr>
                <tr>
                  <td class="PropertyName">Premiered: </td>
                  <td>{(props.Anime.Premiered) ? props.Anime.Premiered.toString() : "Unknown"}</td>
                </tr>
                <tr>
                  <td class="PropertyName">Episodes:</td>
                  <td>{(props.Anime.EpisodeNum) ? props.Anime.EpisodeNum.toString() : "Unknown"}</td>
                </tr>
              </tbody>
            </table>
            <table class="AnimeTypePanel">
              <tbody>
                <tr>
                  <td class="PropertyName">Genres: </td>
                  <td>{(props.Anime.Genres.length != 0) ? get_genre_str(props.Anime.Genres) : "None"}</td>
                </tr>
                <tr>
                  <td class="PropertyName">Themes: </td>
                  <td>{(props.Anime.Themes.length != 0) ? get_genre_str(props.Anime.Themes) : "None"}</td>
                </tr>
                <tr>
                  <td class="PropertyName">Studios:</td>
                  <td>{(props.Anime.Studios.length != 0) ? get_genre_str(props.Anime.Studios) : "None"}</td>
                </tr>
                <tr>
                  <td class="PropertyName">Producers:</td>
                  <td>{(props.Anime.Producers.length != 0) ? get_genre_str(props.Anime.Producers) : "None"}</td>
                </tr>
                <tr>
                  <td class="PropertyName">Demographics:</td>
                  <td>{(props.Anime.Demographics.length != 0) ? get_genre_str(props.Anime.Demographics) : "None"}</td>
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