import React, { useCallback, useEffect, useState } from 'react'
import { Menubar, AnimePoster, TabUnit } from '../../widgets'
import { GetAnime } from "../../db_module"
import redirect from '../../redirect'
import './style.scss';

const num_sample_animes = Math.floor(window.screen.width / 270) * 3;

function Home() {
  const [AnimeHeader, SetAnimeHeader] = useState("")
  const [AnimeContainer, SetAnimeContainer] = useState([])
  const [AnimeTabUnit, SetAnimeTabUnit] = useState(0)
  const [AnimeCountBegin, SetAnimeCountBegin] = useState(0)

  const siteType = window.location.href.split("/").at(-1);
  const fillList = useCallback(() => {
    GetAnime()
      .then((response) => response.json())
      .then((result) => {
        SetAnimeContainer([])
        let AnimeCountEnd = Math.min(AnimeCountBegin + num_sample_animes, result.length);

        let anime_id_arr = [];
        let anime_header = ""

        if (siteType == "Random") {
          let num = Math.floor((Math.random() * (result.length + 1)) % result.length);
          redirect("Anime/" + num);
        } else if (siteType == "Popular") {
          anime_header = "Top Ranked Animes";

          for (let i = AnimeCountBegin; i < AnimeCountEnd; i++) {
            anime_id_arr.push(result[i].AnimeID);
          }
        } else if (siteType == "Recomended") {
          anime_header = "Recomended Animes";

          for (let i = AnimeCountBegin; i < AnimeCountEnd; i++) {
            let AnimeNum = Math.floor((Math.random() * (result.length + 1)) % result.length);
            anime_id_arr.push(result[AnimeNum].AnimeID);
          }
        } else if (siteType == "Newest") {
          anime_header = "Recently Added Animes";
          let to_sort = result;
          to_sort.sort((a, b) => {
            if (!a.AiredBegin.Valid) {
              return 1;
            }

            if(a.AiredBegin.Time < "1900-01-01T00:00:00Z"){
              return -1
            }

            const ABegin = new Date(a.AiredBegin.Time)
            const BBegin = new Date(b.AiredBegin.Time)

            if(ABegin < BBegin){
              return 1
            }else if(ABegin == BBegin){
              return 0
            }else{
              return -1
            }
          });

          for (let i = AnimeCountBegin; i < AnimeCountEnd; i++) {
            anime_id_arr.push(to_sort[i].AnimeID);
          }
        }

        let container = [];

        for (let id of anime_id_arr) {
          const AnimeID = id.toString();
          container.push((<AnimePoster AnimeID={AnimeID} key={AnimeID}/>))
        }

        const foo = (event, index) => {
          SetAnimeCountBegin((index - 1) * num_sample_animes);
          SetAnimeContainer([])
        }

        SetAnimeHeader(anime_header)
        SetAnimeContainer(container)
        SetAnimeTabUnit((<TabUnit TabCount={Math.ceil(result.length / num_sample_animes)} TabCollapse="10" onChange={foo} />))
      })
  })

  if(AnimeContainer.length == 0){
    fillList()
  }
  return (
    <div id="main">
      <Menubar />
      <div id="content">
        <div id="ContentHeader">
          <h1>{AnimeHeader}</h1>
        </div>
        <div id="SampleAnimeList">
          {AnimeContainer}
        </div>
      </div>
      {AnimeTabUnit}
    </div>
  )
}

export default Home