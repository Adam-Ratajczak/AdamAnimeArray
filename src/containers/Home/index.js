import React, {Component} from 'react'
import {Menubar, AnimePoster, TabUnit} from '../../widgets'
import {GetAnime} from "../../db_module"
import redirect from '../../redirect'
import './style.scss';

class Home extends Component {

  constructor(){
    super();
    this.state = {
      num_sample_animes: Math.floor(window.screen.width / 270) * 3,
      siteType: window.location.href.split("/").at(-1),
      AnimeHeader: "",
      AnimeContainer: [],
      AnimeCount: 0,
      AnimeCountBegin: 0,
    }
  }

  FillList(){
    console.log(this.state.AnimeCountBegin);
    GetAnime()
    .then((response) => response.json())
    .then((result) =>{

      let anime_id_arr = [];
      let anime_header = ""

      if(this.state.siteType == "Random"){
        let num = Math.floor((Math.random() * (result.length + 1)) % result.length);
        redirect("Anime/" + num);
      }else if(this.state.siteType == "Popular"){
        anime_header = "Top Ranked Animes";

        for(let i = this.state.AnimeCountBegin; i < this.state.AnimeCountBegin + this.state.num_sample_animes; i++){
          anime_id_arr.push(result[i].AnimeID);
        }
      }else if(this.state.siteType == "Recomended"){
        anime_header = "Recomended Animes";

        for(let i = this.state.AnimeCountBegin; i < this.state.AnimeCountBegin + this.state.num_sample_animes; i++){
          let AnimeNum = Math.floor((Math.random() * (result.length + 1)) % result.length);
          anime_id_arr.push(result[AnimeNum].AnimeID);
        }
      }else if(this.state.siteType == "Newest"){
        anime_header = "Recently Added Animes";
        let to_sort = result;
        to_sort.sort((a, b) =>{
          if(!a.AiredBegin){
            return false;
          }

          return a.AiredBegin < b.AiredBegin;
        });

        for(let i = this.state.AnimeCountBegin; i < this.state.AnimeCountBegin + this.state.num_sample_animes; i++){
          anime_id_arr.push(to_sort[i].AnimeID);
        }
      }

      let container = [];

      for(let id of anime_id_arr){
        const AnimeID = id.toString();
        container.push((<AnimePoster AnimeID={AnimeID}/>))
      }

      this.setState({
        num_sample_animes: Math.floor(window.screen.width / 270) * 3,
        siteType: window.location.href.split("/").at(-1),
        AnimeCountBegin: this.state.AnimeCountBegin,
        AnimeHeader: anime_header,
        AnimeContainer: container,
        AnimeCount: result.length,
      })
    })
  }

  componentDidMount(){
    this.FillList(0);
    this.forceUpdate();
  }

  render(){
    const tab_count = Math.ceil(this.state.AnimeCount / this.state.num_sample_animes);

    const foo = (event, index) => {
      let newState = this.state;
      newState.AnimeCountBegin = (index - 1) * this.state.num_sample_animes;
      this.setState(newState);
      this.FillList(this.state.AnimeCountBegin);
    }

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
        <TabUnit TabCount={tab_count} TabCollapse="10" onChange={foo}/>
      </div>
    )
  }
}

export default Home