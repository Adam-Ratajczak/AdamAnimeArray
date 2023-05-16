import React, { useEffect, useState } from "react";
import { AnimePoster } from "../../widgets";
import { GetAnimeRange } from "../../db_module";
import "./style.scss";
import change_theme from "../../themes";
import redirect from "../../redirect";
import RandomIcon from './random.png'
import { applyEffect } from 'fluent-reveal-effect';

const num_sample_animes = 6

function Home() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    (async () => {
      if (animes.length > 0) {
        return
      }

      async function WriteAnimes(mode) {
        await GetAnimeRange(0, num_sample_animes, mode)
          .then((response) => response.json())
          .then((result) => {
            let res = []
            let animes = []
            for (let elem of result.Animes) {
              animes.push((
                <div class="PosterWrapper">
                  <AnimePoster
                    AnimeID={elem.AnimeID}
                    Title={elem.AnimeTitle}
                    Poster={elem.PosterURL}
                    Premiered={elem.Premiered}
                    EpNum={elem.EpisodeNum}
                    Type={elem.Type.Name}
                    TypeID={elem.Type.ID}
                  />
                </div>
              ))
            }

            function ShowMore() {
              redirect("/List/" + result.Code)
            }

            res.push((
              <div class="AnimeSection">
                <div class="AnimeSectionHeader">
                  <h2>{result.Header}</h2>
                  <button class="ShowMoreBtn" onClick={ShowMore}><span>Show more</span></button>
                </div>
                <div class="SampleAnimeList">
                  {animes}
                </div>
              </div>
            ))

            setAnimes((animes) => [...animes, ...res]);
          })
      }

      await WriteAnimes("sample:0")
      await WriteAnimes("sample:1")
      await WriteAnimes("sample:2")

      function random_anime() {
        GetAnimeRange(0, 1, "sample:2")
          .then((response) => response.json())
          .then((result) => {
            redirect("/Anime/" + result.Animes[0].AnimeID);
          });
      }

      let res = []
      res.push((
        <div id="PickRandomDiv">
          <img src={RandomIcon} />
          <p>No idea what to watch? Try to randomize series!</p>
          <div id="Randomize" onClick={random_anime}><div class="btn">Go to random anime...</div></div>
        </div>
      ))
      setAnimes((animes) => [...animes, ...res]);
      const content = document.getElementById("content")
      content.onscroll = () => {
        let currentScroll = content.scrollTop + window.innerHeight

        if (currentScroll >= content.scrollHeight) {
          if (Math.random() < 0.5) {
            WriteAnimes("genre:0")
          } else {
            WriteAnimes("theme:0")
          }
        }
      }
    })()

    change_theme(document)
    applyEffect('#Randomize', {
      clickEffect: true,
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
  });

  return (
    <>
      <div id="content">
        <div id="SampleAnimeList">{animes}</div>
      </div>
    </>
  );
}

export default Home;
