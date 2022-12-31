import React, { Component } from 'react'
import { AnimePanel, Menubar } from '../../widgets'
import { FilterAnimes, GetDemographics, GetGenre, GetProducer, GetTheme, GetType } from '../../db_module';
import './style.scss'

const animeLimit = 20;

class TypeButton extends Component {
  render() {
    let cb_id = this.props.TypeName + "_" + this.props.TypeID.toString();

    return (
      <div class="CoolButtonDiv">
        <input type="checkbox" class="CoolButtonCb" id={cb_id} name={cb_id} onChange={this.props.onChange} value={this.props.TypeID} />
        <label class="CoolButton" for={cb_id}>
          {this.props.AnimeName}
        </label>
      </div>
    )
  }
}

class Search extends Component {
  constructor(){
    super();
  
    this.state = {
      Genres: [],
      Themes: [],
      Producers: [],
      Demographics: [],
      Types: [],
      Animes: [],
  
      GenreList: [],
      ThemeList: [],
      ProducerList: [],
      DemographicsList: [],
      TypeList: []
    }
  
    this.GetButtons = this.GetButtons.bind(this);
  }
  
  GetButtons(typename, result) {
      result.sort((a, b) => {
        return a.Name > b.Name;
      });
  
      let res = [];
      for (let elem of result) {
        function getArr(input_arr, input_elem) {
          let arr = input_arr;
  
          if (arr.indexOf(input_elem) == -1) {
            arr.push(input_elem);
          } else {
            arr = arr.filter((value, index, array) => {
              return value != input_elem;
            })
          }
  
          return arr;
        }
  
        let callback;
        if (typename == "genre") {
          callback = () => {
            const arr = getArr(this.state.GenreList, elem.ID);
  
            let newState = this.state;
            newState.GenreList = arr;
            this.setState(newState);
          };
        } else if (typename == "theme") {
          callback = () => {
            const arr = getArr(this.state.ThemeList, elem.ID);
  
            let newState = this.state;
            newState.ThemeList = arr;
            this.setState(newState);
          };
        } else if (typename == "producer") {
          callback = () => {
            const arr = getArr(this.state.ProducerList, elem.ID);
  
            let newState = this.state;
            newState.ProducerList = arr;
            this.setState(newState);
          };
        } else if (typename == "demographics") {
          callback = () => {
            const arr = getArr(this.state.DemographicsList, elem.ID);
  
            let newState = this.state;
            newState.DemographicsList = arr;
            this.setState(newState);
          };
        } else if (typename == "type") {
          callback = () => {
            const arr = getArr(this.state.TypeList, elem.ID);
  
            let newState = this.state;
            newState.TypeList = arr;
            this.setState(newState);
          };
        }
  
        res.push((<TypeButton TypeName={typename} TypeID={elem.ID} AnimeName={elem.Name.toString()} onChange={callback} />))
      }
  
      return res;
    }
  
  componentDidMount(){
    GetGenre()
      .then((response) => response.json())
      .then((result) => {
        const res = this.GetButtons("genre", result);
  
        let newState = this.state;
        newState.Genres = res;
        this.setState(newState);
      });
  
    GetTheme()
      .then((response) => response.json())
      .then((result) => {
        const res = this.GetButtons("theme", result);
  
        let newState = this.state;
        newState.Themes = res;
        this.setState(newState);
      });
  
    GetProducer()
      .then((response) => response.json())
      .then((result) => {
        const res = this.GetButtons("producer", result);
  
        let newState = this.state;
        newState.Producers = res;
        this.setState(newState);
      });
  
    GetDemographics()
      .then((response) => response.json())
      .then((result) => {
        const res = this.GetButtons("demographics", result);
  
        let newState = this.state;
        newState.Demographics = res;
        this.setState(newState);
      });
  
    GetType()
      .then((response) => response.json())
      .then((result) => {
        const res = this.GetButtons("type", result);
  
        let newState = this.state;
        newState.Types = res;
        this.setState(newState);
      });

  const SearchFoo = () => {
    const AnimeName = document.getElementById("SearchbarLarge").value;

    FilterAnimes(AnimeName, this.state.TypeList, this.state.GenreList, this.state.ThemeList, this.state.ProducerList, this.state.DemographicsList)
      .then((response) => response.json())
      .then((result) => {
          let res = [];

          for(let i = 0; i < Math.min(animeLimit, result.length); i++){
            res.push(result[i]);
          }

          let newState = this.state;
          newState.Animes = res;
          this.setState(newState);
        })
  }

  let searchPhraze = window.location.href.split("/").at(-1).split("%20").join(" ");

  if(searchPhraze == "*"){
    searchPhraze = "";
  }

  document.getElementById("SearchbarLarge").value = searchPhraze;

  SearchFoo();

  document.getElementById("SearchbtnLarge").onclick = () => {
    let newState = this.state;
    newState.Animes = [];
    this.setState(newState);

    SearchFoo();
  }
}

render(){
  return (
    <div id="main">
      <Menubar />
      <div id="contentSearch">
        <div id="SearchDiv">
          <div id="SearchBarDiv">
            <input type="text" id="SearchbarLarge" placeholder="Search..."></input>
            <input type="button" id="SearchbtnLarge" value="Find"></input>
          </div>
          <div id="SearchResults">
            {this.state.Animes.map(anime => {
              return (<AnimePanel AnimeID={anime.AnimeID} />)
            })}
          </div>
        </div>
        <div id="AnimeTypeDiv">
          <h3>Genres:</h3>
          <div class="AnimeTypeBtnDiv">
            {this.state.Genres}
          </div>
          <h3>Themes:</h3>
          <div class="AnimeTypeBtnDiv">
            {this.state.Themes}
          </div>
          <h3>Demographics:</h3>
          <div class="AnimeTypeBtnDiv">
            {this.state.Demographics}
          </div>
          <h3>Types:</h3>
          <div class="AnimeTypeBtnDiv">
            {this.state.Types}
          </div>
          <h3>Producers:</h3>
          <div class="AnimeTypeBtnDiv">
            {this.state.Producers}
          </div>
        </div>
      </div>
    </div>
  )
}
}

export default Search