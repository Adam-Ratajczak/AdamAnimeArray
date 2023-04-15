import React, { Component } from 'react'
import { AnimePanel, Menubar } from '../../widgets'
import { FilterAnimes, GetDemographics, GetGenre, GetProducer, GetTheme, GetType } from '../../db_module';
import './style.scss'

const animeLimit = 50

class TypeButton extends Component {
  render() {
    let cb_id = this.props.TypeName + "_" + this.props.TypeID.toString();

    return (
      <div class="CoolButtonDiv">
        <input type="checkbox" class="CoolButtonCb" id={cb_id} name={cb_id} onChange={this.props.onChange} value={this.props.TypeID} />
        <label class="CoolButton unselectable" for={cb_id}>
          {this.props.AnimeName}
        </label>
      </div>
    )
  }
}

class Search extends Component {
  constructor() {
    super();

    this.state = {
      Genres: [],
      Themes: [],
      Studios: [],
      Producers: [],
      Demographics: [],
      Types: [],
      Animes: [],

      GenreList: [],
      ThemeList: [],
      StudioList: [],
      ProducerList: [],
      DemographicsList: [],
      TypeList: []
    }

    this.GetButtons = this.GetButtons.bind(this);
  }

  SearchFoo(start, len) {
    const AnimeName = document.getElementById("SearchbarLarge").value;

    FilterAnimes(AnimeName, this.state.TypeList, this.state.GenreList, this.state.ThemeList, this.state.StudioList, this.state.ProducerList, this.state.DemographicsList)
      .then((response) => response.json())
      .then((result) => {
        let res = this.state.Animes;

        for (let i = start; i < Math.min(start + len, result.length); i++) {
          if (res.indexOf(result[i]) == -1) {
            res.push(result[i]);
          }
        }

        let newState = this.state;
        newState.Animes = res;
        this.setState(newState);
      })
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
          newState.Animes = [];
          this.setState(newState);
          this.SearchFoo(0, animeLimit)
        };
      } else if (typename == "theme") {
        callback = () => {
          const arr = getArr(this.state.ThemeList, elem.ID);

          let newState = this.state;
          newState.ThemeList = arr;
          newState.Animes = [];
          this.setState(newState);
          this.SearchFoo(0, animeLimit)
        };
      } else if (typename == "studio") {
        callback = () => {
          const arr = getArr(this.state.StudioList, elem.ID);

          let newState = this.state;
          newState.ProducerList = arr;
          newState.Animes = [];
          this.setState(newState);
          this.SearchFoo(0, animeLimit)
        };
      } else if (typename == "producer") {
        callback = () => {
          const arr = getArr(this.state.ProducerList, elem.ID);

          let newState = this.state;
          newState.ProducerList = arr;
          newState.Animes = [];
          this.setState(newState);
          this.SearchFoo(0, animeLimit)
        };
      } else if (typename == "demographics") {
        callback = () => {
          const arr = getArr(this.state.DemographicsList, elem.ID);

          let newState = this.state;
          newState.DemographicsList = arr;
          newState.Animes = [];
          this.setState(newState);
          this.SearchFoo(0, animeLimit)
        };
      } else if (typename == "type") {
        callback = () => {
          const arr = getArr(this.state.TypeList, elem.ID);

          let newState = this.state;
          newState.TypeList = arr;
          newState.Animes = [];
          this.setState(newState);
          this.SearchFoo(0, animeLimit)
        };
      }
      res.push((<TypeButton TypeName={typename} TypeID={elem.ID} AnimeName={elem.Name == "" ? "Unknown" : elem.Name.toString()} onChange={callback} />))
    }

    return res;
  }

  componentDidMount() {
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
        const res = this.GetButtons("studio", result);

        let newState = this.state;
        newState.Studios = res;
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

    let searchPhraze = window.location.href.split("/").at(-1).split("%20").join(" ");

    if (searchPhraze == "*") {
      searchPhraze = "";
    }

    document.getElementById("SearchbarLarge").value = searchPhraze;

    this.SearchFoo(0, animeLimit);

    document.getElementById("SearchbtnLarge").onclick = () => {
      document.getElementById("SearchbarLarge").value = "";

      let cblist = document.querySelectorAll(".CoolButtonCb")

      for (let cb of cblist) {
        cb.checked = false
      }

      let newState = this.state;
      newState.GenreList = [];
      newState.ThemeList = [];
      newState.ProducerList = [];
      newState.StudioList = [];
      newState.DemographicsList = [];
      newState.TypeList = [];

      this.setState(newState);

      this.SearchFoo(0, animeLimit);
    }

    document.getElementById("SearchBarDiv").onsubmit = (event) => {
      let newState = this.state;
      newState.Animes = [];
      this.setState(newState);

      this.SearchFoo(0, animeLimit);

      event.preventDefault();
    }

    document.getElementById("SearchbarLarge").onkeydown = (event) => {
      if (document.getElementById("SearchbarLarge").value.length < 2) {
        return
      }

      let newState = this.state;
      newState.Animes = [];
      this.setState(newState);

      this.SearchFoo(0, animeLimit);
    }

    document.onscroll = () => {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;

      let modifier = 0;
      if (currentScroll + modifier > documentHeight) {
        this.SearchFoo(this.state.Animes.length, animeLimit);
      }
    }

    let headers = document.querySelectorAll(".GenreHeader")
    let arrows = document.querySelectorAll(".arrow")
    let btns = document.querySelectorAll(".AnimeTypeBtnDiv")

    for (let i = 0; i < headers.length; i++) {
      headers[i].onclick = () => {
        if (arrows[i].classList.contains("right")) {
          arrows[i].classList.remove("right")
          arrows[i].classList.add("down")
          btns[i].style.display = "block"
        } else if (arrows[i].classList.contains("down")) {
          arrows[i].classList.remove("down")
          arrows[i].classList.add("right")
          btns[i].style.display = "none"
        }
      }
    }
  }

  render() {
    return (
      <div id="main">
        <Menubar />
        <div id="contentSearch">
          <div id="SearchDiv">
            <form id="SearchBarDiv">
              <input type="text" id="SearchbarLarge" placeholder="Search..." />
              <input type="button" id="SearchbtnLarge" value="Clear" />
            </form>
            <div id="SearchResults">
              {this.state.Animes.map(anime => {
                return (<AnimePanel AnimeID={anime.AnimeID} />)
              })}
            </div>
          </div>
          <div id="AnimeTypeDiv">
            <h3 class="GenreHeader">Genres<i class="arrow right"></i></h3>
            <div class="AnimeTypeBtnDiv">
              {this.state.Genres}
            </div>
            <h3 class="GenreHeader">Themes<i class="arrow right"></i></h3>
            <div class="AnimeTypeBtnDiv">
              {this.state.Themes}
            </div>
            <h3 class="GenreHeader">Demographics<i class="arrow right"></i></h3>
            <div class="AnimeTypeBtnDiv">
              {this.state.Demographics}
            </div>
            <h3 class="GenreHeader">Types<i class="arrow right"></i></h3>
            <div class="AnimeTypeBtnDiv">
              {this.state.Types}
            </div>
            <h3 class="GenreHeader">Studios<i class="arrow right"></i></h3>
            <div class="AnimeTypeBtnDiv">
              {this.state.Studios}
            </div>
            <h3 class="GenreHeader">Producers<i class="arrow right"></i></h3>
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