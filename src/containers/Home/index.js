import React, {useEffect, useState} from 'react'
import {Menubar, AnimePoster} from '../../widgets'
import {GetAnime} from "../../db_module"
import redirect from '../../redirect'
import './style.scss';

const num_sample_animes = 21;

function Home() {
  const siteType = window.location.href.split("/").at(-1);
  const [AnimeHeader, SetAnimeHeader] = useState(0)
  const [AnimeContainer, SetAnimeContainer] = useState(0)

  useEffect(() =>{
    GetAnime()
    .then((response) => response.json())
    .then((result) =>{

      let anime_id_arr = [];

      if(siteType == "Random"){
        let num = Math.floor((Math.random() * (result.length + 1)) % result.length);
        redirect("Anime/" + num);
      }else if(siteType == "Popular"){
        SetAnimeHeader("Top Ranked Animes");

        for(let i = 0; i < num_sample_animes; i++){
          anime_id_arr.push(result[i].AnimeID);
        }
      }else if(siteType == "Recomended"){
        SetAnimeHeader("Recomended Animes");

        for(let i = 0; i < num_sample_animes; i++){
          let AnimeNum = Math.floor((Math.random() * (result.length + 1)) % result.length);
          anime_id_arr.push(result[AnimeNum].AnimeID);
        }
      }else if(siteType == "Newest"){
        SetAnimeHeader("Recently Added Animes");
        let to_sort = result;
        to_sort.sort((a, b) =>{
          if(!a.AiredBegin){
            return false;
          }

          return a.AiredBegin < b.AiredBegin;
        });

        for(let i = 0; i < num_sample_animes; i++){
          anime_id_arr.push(to_sort[i].AnimeID);
        }
      }

      let container = [];

      for(let id of anime_id_arr){
        const AnimeID = id.toString();
        container.push((<AnimePoster AnimeID={AnimeID}/>))
      }

      SetAnimeContainer(container);
    })
  }, []);  

  return (
    <div id="main">
      <Menubar/>
      <div id="content">
        <div id="ContentHeader">
          <h1>{AnimeHeader}</h1>
        </div>
        <div id="SampleAnimeList">
          {AnimeContainer}
        </div>
      </div>
    </div>
  )
}

export default Home