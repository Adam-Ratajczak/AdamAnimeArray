import React, { useEffect, useState } from "react";
import { AnimePoster } from "../../widgets";
import { GetAnimeRange } from "../../db_module";
import "./style.scss";
import change_theme from "../../themes";
import redirect from "../../redirect";
import RandomIcon from './random.png'
import { applyEffect } from 'fluent-reveal-effect';
import LoginMan from "../../login_manager";

const num_sample_animes = 5

function Home() {
  const [animes, setAnimes] = useState([]);
  const [genres, setGenres] = useState([])

  useEffect(() => {
    (async () => {
      if (animes.length > 0) {
        return
      }

      async function WriteAnimes(mode) {
        await GetAnimeRange(0, num_sample_animes, mode)
          .then((response) => response.json())
          .then((result) => {
            if (genres.indexOf(result.Code) != -1) {
              return
            }

            let res = []
            let animes = []
            for (let elem of result.Animes) {
              animes.push((
                <AnimePoster
                  AnimeID={elem.AnimeID}
                  Title={elem.AnimeTitle}
                  Poster={elem.PosterURL}
                  Premiered={elem.Premiered}
                  EpNum={elem.EpisodeNum}
                  Type={elem.Type.Name}
                  TypeID={elem.Type.ID}
                />
              ))
            }

            res.push((
              <div class="AnimeSection">
                <div class="AnimeSectionHeader">
                  <h2>{result.Header}</h2>
                  <a class="ShowMoreBtn" href={"/List/" + result.Code}><span>Show more</span></a>
                </div>
                <div class="SampleAnimeList">
                  {animes}
                </div>
              </div>
            ))

            setAnimes((animes) => [...animes, ...res]);

            let res2 = genres
            res2.push(result.Code)
            setGenres(res2);
          })
      }
      if (LoginMan.LoggedIn()) {
        const watchlist = await LoginMan.getWatchlist()
        let animes = []
        let res = []
        let i = 0;

        for (let elem of watchlist) {
          if (i == num_sample_animes) {
            break
          }
          animes.push((
            <AnimePoster
              AnimeID={elem.AnimeID}
              Title={elem.AnimeTitle}
              Poster={elem.PosterURL}
              Premiered={elem.Premiered}
              EpNum={elem.EpisodeNum}
              Type={elem.Type.Name}
              TypeID={elem.Type.ID}
              Mode="watchlist"
            />
          ))
          i++
        }

        res.push((
          <div class="AnimeSection Watchlist">
            <div class="AnimeSectionHeader">
              <h2 class="UserAnimes">Your watchlist:</h2>
              {watchlist.length > num_sample_animes ? (<a class="ShowMoreBtn" href={"/watchlist"}><span>Show more</span></a>) : (<></>)}
            </div>
            {watchlist.length != 0 ? (
              <div class="SampleAnimeList">
                {animes}
              </div>
            ) : (
              <p style={{ color: "white", marginLeft: "50px", marginTop: "0px" }}>No series in your watchlist!</p>
            )}
          </div>
        ))

        const watched = await LoginMan.getWatched()
        animes = []
        i = 0;

        for (let elem of watched) {
          if (i == num_sample_animes) {
            break
          }
          animes.push((
            <AnimePoster
              AnimeID={elem.WatchedAnime.AnimeID}
              Title={elem.WatchedAnime.AnimeTitle}
              Poster={elem.WatchedAnime.PosterURL}
              Premiered={elem.WatchedAnime.Premiered}
              EpNum={elem.WatchedAnime.EpisodeNum}
              Type={elem.WatchedAnime.Type.Name}
              TypeID={elem.WatchedAnime.Type.ID}
              Mode="watched"
              EpNr={elem.WatchedEp}
              Watched={elem.Watched}
            />
          ))
          i++
        }

        if (watched.length > 0) {
          res.push((
            <div class="AnimeSection">
              <div class="AnimeSectionHeader">
                <h2 class="UserAnimes">Recently watched:</h2>
                {watchlist.length > num_sample_animes ? (<a class="ShowMoreBtn" href={"/watched"}><span>Show more</span></a>) : (<></>)}
              </div>
              <div class="SampleAnimeList">
                {animes}
              </div>
            </div>
          ))
        }

        const finished = await LoginMan.getFinished()
        animes = []
        i = 0;

        for (let elem of finished) {
          if (i == num_sample_animes) {
            break
          }
          animes.push((
            <AnimePoster
              AnimeID={elem.WatchedAnime.AnimeID}
              Title={elem.WatchedAnime.AnimeTitle}
              Poster={elem.WatchedAnime.PosterURL}
              Premiered={elem.WatchedAnime.Premiered}
              EpNum={elem.WatchedAnime.EpisodeNum}
              Type={elem.WatchedAnime.Type.Name}
              TypeID={elem.WatchedAnime.Type.ID}
              Mode="finished"
              EpNr={elem.WatchedEp}
              Watched={elem.Watched}
            />
          ))
          i++
        }

        if (finished.length > 0) {
          res.push((
            <div class="AnimeSection">
              <div class="AnimeSectionHeader">
                <h2 class="UserAnimes">Watch again:</h2>
                {watchlist.length > num_sample_animes ? (<a class="ShowMoreBtn" href={"/finished"}><span>Show more</span></a>) : (<></>)}
              </div>
              <div class="SampleAnimeList">
                {animes}
              </div>
            </div>
          ))
        }

        setAnimes((animes) => [...animes, ...res]);
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
