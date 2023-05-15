import React, { useCallback, useEffect, useState } from "react";
import { AnimePoster, TabUnit } from "../../widgets";
import { GetAnimeRange } from "../../db_module";
import "./style.scss";
import change_theme from "../../themes";

const num_sample_animes = Math.floor(window.screen.width / 270) * 3;

function Home() {
  const [AnimeHeader, SetAnimeHeader] = useState("");
  const [AnimeContainer, SetAnimeContainer] = useState([]);
  const [AnimeTabUnit, SetAnimeTabUnit] = useState(0);
  const [FirstTime, SetFirstTime] = useState(true);

  const siteType = window.location.href.split("/").at(-1);
  const fillList = useCallback((begin) => {
    let mode = 0;
    let anime_header = "";

    if (siteType == "Popular") {
      mode = 0;
      anime_header = "Top Ranked Animes";
    } else if (siteType == "Newest") {
      mode = 1;
      anime_header = "Recently Added Animes";
    } else if (siteType == "Recomended") {
      mode = 2;
      anime_header = "Recomended Animes";
    }
    SetAnimeHeader(anime_header);

    GetAnimeRange(begin, num_sample_animes, mode)
      .then((response) => response.json())
      .then((result) => {
        let container = [];
        const foo = (event, index) => {
          fillList((index - 1) * num_sample_animes);
        };
        SetAnimeTabUnit(
          <TabUnit
            Index="1"
            TabCount={Math.ceil(result.AnimeCount / num_sample_animes)}
            TabCollapse="10"
            onChange={foo}
          />
        );
        for (let elem of result.Animes) {
          container.push(
            <div class="PosterOutline">
              <AnimePoster
                AnimeID={elem.AnimeID}
                Title={elem.AnimeTitle}
                Poster={elem.PosterURL}
                Premiered={elem.Premiered}
                EpNum={elem.EpisodeNum}
                Type={elem.Type.Name}
              />
            </div>
          );
        }
        SetAnimeContainer(container);
      });
  });

  useEffect(() => {
    if (FirstTime) {
      SetFirstTime(false);
      fillList(0);
    }

    (async () => {
      change_theme(document.getElementById("SampleAnimeList"))
    })()
  });
  

  return (
    <>
      <div id="content">
        <div id="ContentHeader">
          <h1>{AnimeHeader}</h1>
        </div>
        <div id="SampleAnimeList">{AnimeContainer}</div>
      </div>
      {AnimeTabUnit}
    </>
  );
}

export default Home;
