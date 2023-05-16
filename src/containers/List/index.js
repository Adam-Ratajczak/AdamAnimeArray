import React, { useEffect, useState } from "react";
import { AnimePoster, TabUnit } from "../../widgets";
import { GetAnimeRange } from "../../db_module";
import "./style.scss";
import redirect from "../../redirect";

const num_sample_animes = 18

function List() {
  const [animes, setAnimes] = useState(0);
  const [tabs, setTabs] = useState(0);

  useEffect(() => {
    (async () => {
      // eslint-disable-next-line no-restricted-globals
      let mode = location.href.split("/").at(-1)
      async function GetAnimes(index) {
        await GetAnimeRange(index, num_sample_animes, mode)
          .then((response) => response.json())
          .then((result) => {
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

            function BackTo() {
              redirect("/")
            }

            setAnimes((
              <div class="AnimeSection">
                <div class="AnimeListHeader">
                  <button class="BackBtn" onClick={BackTo}><span>Back to main page</span></button>
                  <h2>{result.Header}</h2>
                </div>
                <div id="AnimeList">
                  {animes}
                </div>
                {tabs}
              </div>
            ));

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

      GetAnimes(0)

    })()
  }, []);


  return (
    <>
      <div id="content">
        <div id="SampleAnimeList">{animes}</div>
      </div>
      {tabs}
    </>
  );
}

export default List;
