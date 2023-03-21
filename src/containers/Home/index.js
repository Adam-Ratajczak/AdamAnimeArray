import React, { useEffect, useState } from "react";
import { Menubar, AnimePoster, TabUnit } from "../../widgets";
import { GetAnime } from "../../db_module";
import redirect from "../../redirect";
import "./style.scss";

const num_sample_animes = Math.floor(window.screen.width / 270) * 3;

function Home({ type: siteType }) {
  document.documentElement.style.setProperty("--foreground-color", "#FF0000");

  const [AnimeHeader, setAnimeHeader] = useState("");
  const [AnimeContainer, setAnimeContainer] = useState([]);
  const [AnimeTabUnit, setAnimeTabUnit] = useState(null);

  useEffect(() => {
    async function FillList(AnimeCountBegin) {
      setAnimeContainer([]);

      const response = await GetAnime();
      if (response.status >= 400) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      let AnimeCountEnd = Math.min(
        AnimeCountBegin + num_sample_animes,
        result.length
      );

      let anime_id_arr = [];
      let anime_header = "";

      console.log("SITE TYPE", siteType);

      if (siteType === "Random") {
        let num = Math.floor(
          (Math.random() * (result.length + 1)) % result.length
        );
        redirect("Anime/" + num);
      } else if (siteType === "Popular") {
        anime_header = "Top Ranked Animes";

        for (let i = AnimeCountBegin; i < AnimeCountEnd; i++) {
          anime_id_arr.push(result[i].AnimeID);
        }
      } else if (siteType === "Recomended") {
        anime_header = "Recomended Animes";

        for (let i = AnimeCountBegin; i < AnimeCountEnd; i++) {
          let AnimeNum = Math.floor(
            (Math.random() * (result.length + 1)) % result.length
          );
          anime_id_arr.push(result[AnimeNum].AnimeID);
        }
      } else if (siteType === "Newest") {
        anime_header = "Recently Added Animes";
        let to_sort = result;
        to_sort.sort((a, b) => {
          if (!a.AiredBegin) {
            return false;
          }

          return a.AiredBegin < b.AiredBegin;
        });

        for (let i = AnimeCountBegin; i < AnimeCountEnd; i++) {
          anime_id_arr.push(to_sort[i].AnimeID);
        }
      }

      let container = [];

      for (let id of anime_id_arr) {
        const AnimeID = id.toString();
        container.push(<AnimePoster AnimeID={AnimeID} />);
      }

      const foo = (event, index) => {
        FillList((index - 1) * num_sample_animes);
      };

      setAnimeHeader(anime_header);
      setAnimeContainer(container);
      setAnimeTabUnit(
        <TabUnit
          TabCount={Math.ceil(result.length / num_sample_animes)}
          TabCollapse="10"
          onChange={foo}
        />
      );
    }

    FillList(0).catch((e) => {
      console.log(e);
      setAnimeHeader(<div>Error: {e.message}</div>);
    });
  }, [siteType]);

  return (
    <div id="main">
      <Menubar />
      <div id="content">
        <div id="ContentHeader">
          <h1>{AnimeHeader}</h1>
        </div>
        <div id="SampleAnimeList">{AnimeContainer}</div>
      </div>
      {AnimeTabUnit}
    </div>
  );
}

export default Home;
