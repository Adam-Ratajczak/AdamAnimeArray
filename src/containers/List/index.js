import React, { useEffect, useState } from "react";
import { AnimePoster, TabUnit } from "../../widgets";
import { GetAnimeRange } from "../../db_module";
import "./style.scss";
import redirect from "../../redirect";
import LoginMan from "../../login_manager";

const num_sample_animes = 18

function List(props) {
  const [animes, setAnimes] = useState([]);
  const [tabs, setTabs] = useState(0);
  const [header, setHeader] = useState(0);

  if (!LoginMan.LoggedIn()) {
    redirect("/")
  }

  useEffect(() => {
    (async () => {
      // eslint-disable-next-line no-restricted-globals
      let mode = location.href.split("/").at(-1)
      async function GetAnimes(index) {
        if (props.Mode == "Watchlist") {
          const watchlist = await LoginMan.getWatchlist()
          let animeList = []

          for (let i = index; i < index + num_sample_animes; i++) {
            if (i >= watchlist.length) {
              break
            }

            const elem = watchlist[i]

            animeList.push((
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
          }

          setHeader("Your watchlist:")
          setAnimes(animeList);

          function OnChange(event, index) {
            setAnimes([])
            GetAnimes((index - 1) * num_sample_animes);
          }

          setTabs((
            <TabUnit
              Index="1"
              TabCount={Math.ceil(watchlist.length / num_sample_animes)}
              TabCollapse="10"
              onChange={OnChange}
            />
          ))
        } else if (props.Mode == "Watched") {
          const watchlist = await LoginMan.getWatched()
          let animeList = []

          for (let i = index; i < index + num_sample_animes; i++) {
            if (i >= watchlist.length) {
              break
            }

            const elem = watchlist[i]

            animeList.push((
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
          }

          setHeader("Recently watched:")
          setAnimes(animeList);

          function OnChange(event, index) {
            setAnimes([])
            GetAnimes((index - 1) * num_sample_animes);
          }

          setTabs((
            <TabUnit
              Index="1"
              TabCount={Math.ceil(watchlist.length / num_sample_animes)}
              TabCollapse="10"
              onChange={OnChange}
            />
          ))
        } else if (props.Mode == "Finished") {
          const watchlist = await LoginMan.getFinished()
          let animeList = []

          for (let i = index; i < index + num_sample_animes; i++) {
            if (i >= watchlist.length) {
              break
            }

            const elem = watchlist[i]

            animeList.push((
              <AnimePoster
              AnimeID={elem.WatchedAnime.AnimeID}
              Title={elem.WatchedAnime.AnimeTitle}
              Poster={elem.WatchedAnime.PosterURL}
              Premiered={elem.WatchedAnime.Premiered}
              EpNum={elem.WatchedAnime.EpisodeNum}
              Type={elem.WatchedAnime.Type.Name}
              TypeID={elem.WatchedAnime.Type.ID}
              Mode="finished"
              Watched={elem.Watched}
              />
            ))
          }

          setHeader("Already finished:")
          setAnimes(animeList);

          function OnChange(event, index) {
            setAnimes([])
            GetAnimes((index - 1) * num_sample_animes);
          }

          setTabs((
            <TabUnit
              Index="1"
              TabCount={Math.ceil(watchlist.length / num_sample_animes)}
              TabCollapse="10"
              onChange={OnChange}
            />
          ))
        } else if (props.Mode == "List") {
          await GetAnimeRange(index, num_sample_animes, mode)
            .then((response) => response.json())
            .then((result) => {
              let animeList = []
              for (let elem of result.Animes) {
                animeList.push((
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

              setHeader(result.Header)
              setAnimes(animeList);

              function OnChange(event, index) {
                GetAnimes((index - 1) * num_sample_animes);
              }

              setTabs((
                <TabUnit
                  Index="1"
                  TabCount={Math.ceil(result.AnimeCount / num_sample_animes)}
                  TabCollapse="10"
                  onChange={OnChange}
                />
              ))
            })
        }
      }

      GetAnimes(0)

    })()
  }, []);


  return (
    <>
      <div id="content">
        <div class="AnimeListSection">
          <div class="AnimeListHeader">
            <a class="BackBtn" href="/"><span>Back to main page</span></a>
            <h2>{header}</h2>
          </div>
          <div id="AnimeList">
            {animes}
          </div>
        </div>
      </div>
      {tabs}
    </>
  );
}

export default List;
