import React, { Component, useCallback, useEffect, useState } from 'react'
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

function Search() {
  const [Genres, SetGenres] = useState(0);
  const [Themes, SetThemes] = useState(0);
  const [Producers, SetProducers] = useState(0);
  const [Demographics, SetDemographics] = useState(0);
  const [Types, SetTypes] = useState(0);
  const [Animes, SetAnimes] = useState(0);

  let [GenreList, SetGenreList] = useState([]);
  let [ThemeList, SetThemeList] = useState([]);
  let [ProducerList, SetProducerList] = useState([]);
  let [DemographicsList, SetDemographicsList] = useState([]);
  let [TypeList, SetTypeList] = useState([]);

  function GetButtons(typename, result) {
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
          const arr = getArr(GenreList, elem.ID);

          GenreList = arr;
        };
      } else if (typename == "theme") {
        callback = () => {
          const arr = getArr(ThemeList, elem.ID);

          ThemeList = arr;
        };
      } else if (typename == "producer") {
        callback = () => {
          const arr = getArr(ProducerList, elem.ID);

          ProducerList = arr;
        };
      } else if (typename == "demographics") {
        callback = () => {
          const arr = getArr(DemographicsList, elem.ID);

          DemographicsList = arr;
        };
      } else if (typename == "type") {
        callback = () => {
          const arr = getArr(TypeList, elem.ID);

          TypeList = arr;
        };
      }

      res.push((<TypeButton TypeName={typename} TypeID={elem.ID} AnimeName={elem.Name.toString()} onChange={callback} />))
    }

    return res;
  }

  useEffect(() => GetGenre()
    .then((response) => response.json())
    .then((result) => {
      const res = GetButtons("genre", result);

      SetGenres(res);
    }), []);

  useEffect(() => GetTheme()
    .then((response) => response.json())
    .then((result) => {
      const res = GetButtons("theme", result);

      SetThemes(res);
    }), []);

  useEffect(() => GetProducer()
    .then((response) => response.json())
    .then((result) => {
      const res = GetButtons("producer", result);

      SetProducers(res);
    }), []);

  useEffect(() => GetDemographics()
    .then((response) => response.json())
    .then((result) => {
      const res = GetButtons("demographics", result);

      SetDemographics(res);
    }), []);

  useEffect(() => GetType()
    .then((response) => response.json())
    .then((result) => {
      const res = GetButtons("type", result);

      SetTypes(res);
    }), []);

  const useSearch = useCallback(() => {
    const AnimeName = (document.getElementById("SearchbarLarge")) ? document.getElementById("SearchbarLarge").value : "";

    FilterAnimes(AnimeName, TypeList, GenreList, ThemeList, ProducerList, DemographicsList)
      .then((response) => response.json())
      .then((result) => {
        let res = [];
        let i = 0;
        if (result == 0) {
          SetAnimes((<h1>No results found!</h1>));
        } else {
          for (let elem of result) {
            if (i == animeLimit) {
              break;
            }
            res.push((<AnimePanel AnimeID={elem.AnimeID} />));
            i++;
          }

          SetAnimes(res);
        }
      })
  }, []);

  // let searchPhraze = window.location.href.split("/").at(-1);

  // if(searchPhraze == "*"){
  //   searchPhraze = "";
  // }

  useSearch();

  return (
    <div id="main">
      <Menubar />
      <div id="contentSearch">
        <div id="SearchDiv">
          <div id="SearchBarDiv">
            <input type="text" id="SearchbarLarge" placeholder="Search..."></input>
            <input type="button" id="SearchbtnLarge" value="Find" onClick={useSearch}></input>
          </div>
          <div id="SearchResults">
            {Animes}
          </div>
        </div>
        <div id="AnimeTypeDiv">
          <h3>Genres:</h3>
          <div class="AnimeTypeBtnDiv">
            {Genres}
          </div>
          <h3>Themes:</h3>
          <div class="AnimeTypeBtnDiv">
            {Themes}
          </div>
          <h3>Demographics:</h3>
          <div class="AnimeTypeBtnDiv">
            {Demographics}
          </div>
          <h3>Types:</h3>
          <div class="AnimeTypeBtnDiv">
            {Types}
          </div>
          <h3>Producers:</h3>
          <div class="AnimeTypeBtnDiv">
            {Producers}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search