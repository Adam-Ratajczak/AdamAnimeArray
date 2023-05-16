import React, { useCallback, useEffect, useState } from "react";
import { AnimePoster, TabUnit } from "../../widgets";
import { GetAnimeRange } from "../../db_module";
import "./style.scss";
import change_theme from "../../themes";
import redirect from "../../redirect";

const num_sample_animes = 6

function Home() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    (async () => {
      async function WriteAnimes(mode) {
        await GetAnimeRange(0, num_sample_animes, mode)
          .then((response) => response.json())
          .then((result) => {
            let res = []
            let animes = []
            for (let elem of result.Animes) {
              animes.push((<AnimePoster
                AnimeID={elem.AnimeID}
                Title={elem.AnimeTitle}
                Poster={elem.PosterURL}
                Premiered={elem.Premiered}
                EpNum={elem.EpisodeNum}
                Type={elem.Type.Name}
                TypeID={elem.Type.ID}
              />))
            }

            function ShowMore(){
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

      await change_theme(document.getElementById("SampleAnimeList"))
    })()
  }, []);


  return (
    <>
      <div id="content">
        <div id="SampleAnimeList">{animes}</div>
      </div>
    </>
  );
}

export default Home;
