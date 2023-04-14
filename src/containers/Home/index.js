import React, { useCallback, useEffect, useState } from "react";
import { Menubar, AnimePoster, TabUnit } from "../../widgets";
import { GetAnime } from "../../db_module";
import redirect from "../../redirect";
import "./style.scss";

const num_sample_animes = Math.floor(window.screen.width / 270) * 3;

function Home() {
  const [AnimeContainer, SetAnimeContainer] = useState(null);
  const [AnimeTabUnit, SetAnimeTabUnit] = useState(0);
  const [AnimeCountBegin, SetAnimeCountBegin] = useState(0);

  function isLoaded() {
    return AnimeContainer !== null;
  }

  const siteType = window.location.href.split("/").at(-1);

  function getAnimeHeader() {
    let anime_header = "";
    switch (siteType) {
      case "Popular":
        anime_header = "Top Ranked Animes";
        break;
      case "Recomended":
        anime_header = "Recommended Animes";
        break;
      case "Newest":
        anime_header = "Recently Added Animes";
        break;
      case "Random":
        anime_header = "Picking a random anime...";
        break;
      default:
        break;
    }
    return anime_header;
  }

  const fillList = useCallback(() => {
    GetAnime()
      .then((response) => response.json())
      .then((result) => {
        // Hacky error handling btw here
        if (!(result instanceof Array)) {
          SetAnimeContainer(
            <div style={{ color: "white", marginBottom: "15px" }}>
              {result.message}
            </div>
          );
          return;
        }

        SetAnimeContainer([]);
        let AnimeCountEnd = Math.min(
          AnimeCountBegin + num_sample_animes,
          result.length
        );

        let anime_id_arr = [];

        if (siteType === "Random") {
          let num = Math.floor(
            (Math.random() * (result.length + 1)) % result.length
          );
          redirect("Anime/" + num);
        } else if (siteType === "Popular") {
          for (let i = AnimeCountBegin; i < AnimeCountEnd; i++) {
            anime_id_arr.push(result[i].AnimeID);
          }
        } else if (siteType === "Recomended") {
          for (let i = AnimeCountBegin; i < AnimeCountEnd; i++) {
            let AnimeNum = Math.floor(
              (Math.random() * (result.length + 1)) % result.length
            );
            anime_id_arr.push(result[AnimeNum].AnimeID);
          }
        } else if (siteType === "Newest") {
          let to_sort = result;
          to_sort.sort((a, b) => {
            if (!a.AiredBegin.Valid) {
              return 1;
            }

            if (a.AiredBegin.Time < "1900-01-01T00:00:00Z") {
              return -1;
            }

            const ABegin = new Date(a.AiredBegin.Time);
            const BBegin = new Date(b.AiredBegin.Time);

            if (ABegin < BBegin) {
              return 1;
            } else if (ABegin === BBegin) {
              return 0;
            } else {
              return -1;
            }
          });

          for (let i = AnimeCountBegin; i < AnimeCountEnd; i++) {
            anime_id_arr.push(to_sort[i].AnimeID);
          }
        }

        let container = [];

        for (let id of anime_id_arr) {
          const AnimeID = id.toString();
          container.push(<AnimePoster AnimeID={AnimeID} key={AnimeID} />);
        }

        const foo = (event, index) => {
          SetAnimeCountBegin((index - 1) * num_sample_animes);
          SetAnimeContainer([]);
        };

        SetAnimeContainer(container);
        SetAnimeTabUnit(
          <TabUnit
            TabCount={Math.ceil(result.length / num_sample_animes)}
            TabCollapse="10"
            onChange={foo}
          />
        );
      });
  }, [AnimeCountBegin, siteType]);

  if (AnimeContainer === null) {
    fillList();
  }
  return (
    <div id="main">
      <Menubar />
      <div id="content">
        <div id="ContentHeader">
          <h1>{getAnimeHeader()}</h1>
        </div>
        <div id="SampleAnimeList">
          {isLoaded() ? (
            AnimeContainer
          ) : (
            <div class="Loading" style={{ marginBottom: "20px" }} />
          )}
        </div>
      </div>
      {AnimeTabUnit}
    </div>
  );
}

export default Home;
