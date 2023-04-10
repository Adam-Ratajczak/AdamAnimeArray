import React, {Component} from 'react'
import {Menubar, AnimePoster, TabUnit} from '../../widgets'
import {GetAnime} from "../../db_module"
import redirect from '../../redirect'
import './style.scss';

const num_sample_animes = Math.floor(window.screen.width / 270) * 3;

class Home extends Component {

  constructor(){
    super();
    document.documentElement.style.setProperty("--foreground-color", "#FF0000");
    this.state = {
      AnimeHeader: "",
      AnimeContainer: [],
      AnimeTabUnit: 0
    }
  }

  FillList(AnimeCountBegin){
    let newState = this.state;
    newState.AnimeContainer = [];
    this.setState(newState);

    const siteType = window.location.href.split("/").at(-1);
    GetAnime()
    .then((response) => response.json())
    .then((result) =>{

      let AnimeCountEnd = Math.min(AnimeCountBegin + num_sample_animes, result.length);

      let anime_id_arr = [];
      let anime_header = ""

      if(siteType == "Random"){
        let num = Math.floor((Math.random() * (result.length + 1)) % result.length);
        redirect("Anime/" + num);
      }else if(siteType == "Popular"){
        anime_header = "Top Ranked Animes";

        for(let i = AnimeCountBegin; i < AnimeCountEnd; i++){
          anime_id_arr.push(result[i].AnimeID);
        }
      }else if(siteType == "Recomended"){
        anime_header = "Recomended Animes";

        for(let i = AnimeCountBegin; i < AnimeCountEnd; i++){
          let AnimeNum = Math.floor((Math.random() * (result.length + 1)) % result.length);
          anime_id_arr.push(result[AnimeNum].AnimeID);
        }
      }else if(siteType == "Newest"){
        anime_header = "Recently Added Animes";
        let to_sort = result;
        to_sort.sort((a, b) =>{
          if(!a.AiredBegin){
            return false;
          }

          return a.AiredBegin < b.AiredBegin;
        });

        for(let i = AnimeCountBegin; i < AnimeCountEnd; i++){
          anime_id_arr.push(to_sort[i].AnimeID);
        }
      }

      let container = [];

      for(let id in anime_id_arr){
        const AnimeID = id.toString();
        container.push((<AnimePoster AnimeID={AnimeID}/>))
      }

      const foo = (event, index) => {
        this.FillList((index - 1) * num_sample_animes);
      }

      this.setState({
        AnimeHeader: anime_header,
        AnimeContainer: container,
        AnimeTabUnit: (<TabUnit TabCount={Math.ceil(result.length / num_sample_animes)} TabCollapse="10" onChange={foo}/>),
      })
    })
  }

  componentDidMount(){
    this.FillList(0);

    this.forceUpdate();
  }

  render(){

    return (
      <div id="main">
        <Menubar/>
        <div id="content">
          <div id="ContentHeader">
            <h1>{this.state.AnimeHeader}</h1>
          </div>
          <div id="SampleAnimeList">
            {this.state.AnimeContainer}
          </div>
        </div>
        {this.state.AnimeTabUnit}
      </div>
    )
  }
}

export default Home