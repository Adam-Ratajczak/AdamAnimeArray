import React, { useState, useCallback, useEffect, useRef } from "react";
import { AnimePanel } from "../../widgets";
import { FilterAnimes, GetDbInfo } from "../../db_module";
import "./style.scss";

const animeLimit = 10;

function TypeButton({ AnimeName, TypeID, onChecked }) {
  return (
    <div className="CoolButtonDiv">
      <label className="CoolButton unselectable">
        <input
          type="checkbox"
          className="CoolButton"
          onChange={(evt) => onChecked(evt.target.checked)}
          value={TypeID}
        />
        {AnimeName}
      </label>
    </div>
  );
}

function Search() {
  // Results
  const [Animes, setAnimes] = useState([]);

  // List of categories fetched from server
  const [Genres, setGenres] = useState([]);
  const [Themes, setThemes] = useState([]);
  const [Studios, setStudios] = useState([]);
  const [Producers, setProducers] = useState([]);
  const [Demographics, setDemographics] = useState([]);
  const [Types, setTypes] = useState([]);

  // List of categories as filtered by user
  const [GenreFilter, setGenreFilter] = useState(new Set());
  const [ThemeFilter, setThemeFilter] = useState(new Set());
  const [StudioFilter, setStudioFilter] = useState(new Set());
  const [ProducerFilter, setProducerFilter] = useState(new Set());
  const [DemographicsFilter, setDemographicsFilter] = useState(new Set());
  const [TypeFilter, setTypeFilter] = useState(new Set());

  const [fetching, setFetching] = useState(true);

  const searchBar = useRef();

  let [searchPhrase, setSearchPhrase] = useState(
    window.location.href.split("/").at(-1).split("%20").join(" ")
  );
  if (searchPhrase === "*") {
    setSearchPhrase("");
  }

  function updateSearchPhrase(phrase) {
    searchBar.current.value = phrase;
    setSearchPhrase(phrase);
    if (document.getElementById("SearchbarLarge").value.length < 2) {
      return;
    }
  }

  function clearBtnOnClick() {
    updateSearchPhrase("");
  }

  function searchBarOnKeyDown(event) {
    if (event.code === "Enter") {
      updateSearchPhrase(event.target.value);
    }
  }

  useEffect(() => {
    GetDbInfo()
      .then((response) => response.json())
      .then((result) => {
        setGenres(result.Genres);
        setThemes(result.Themes);
        setStudios(result.Studios);
        setProducers(result.Producers);
        setDemographics(result.Demographics);
        setTypes(result.Types);
      });

    let headers = document.querySelectorAll(".FilterCategoryHeader");
    let arrows = document.querySelectorAll(".arrow");
    let btns = document.querySelectorAll(".AnimeTypeBtnDiv");

    for (let i = 0; i < headers.length; i++) {
      headers[i].onclick = () => {
        if (arrows[i].classList.contains("right")) {
          arrows[i].classList.remove("right");
          arrows[i].classList.add("down");
          btns[i].style.display = "block";
        } else if (arrows[i].classList.contains("down")) {
          arrows[i].classList.remove("down");
          arrows[i].classList.add("right");
          btns[i].style.display = "none";
        }
      };
    }
  }, []);

  const fetchMoreResults = useCallback(
    (offset) => {
      // console.log("Fetching = true");
      setFetching(true);
      // console.log("Fetch", Animes.length, animeLimit);
      FilterAnimes(
        offset,
        animeLimit,
        searchPhrase,
        [...TypeFilter],
        [...GenreFilter],
        [...ThemeFilter],
        [...StudioFilter],
        [...ProducerFilter],
        [...DemographicsFilter]
      )
        .then((response) => response.json())
        .then((result) => {
          // console.log("Returned " + result.length + " results");
          setAnimes((animes) => [...animes, ...result]);
          // console.log("Fetching = false");
          setFetching(false);
        });
    },
    [
      searchPhrase,
      TypeFilter,
      GenreFilter,
      ThemeFilter,
      StudioFilter,
      ProducerFilter,
      DemographicsFilter,
    ]
  );

  useEffect(() => {
    function onScroll() {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;

      if (!fetching && currentScroll >= documentHeight - 50) {
        // console.log("SCROLL", currentScroll, documentHeight);
        fetchMoreResults(Animes.length);
        document.onscroll = null;
      }
    }
    // console.log("new onscroll ", fetching);
    document.onscroll = onScroll;
    return () => {
      document.onscroll = null;
    };
  }, [Animes.length, fetching, fetchMoreResults]);

  useEffect(() => {
    fetchMoreResults(0);
    return () => {
      setAnimes([]);
    };
  }, [fetchMoreResults]);

  function renderButtons(typename, result) {
    result.sort((a, b) => {
      return a.Name > b.Name;
    });

    let res = [];
    for (let elem of result) {
      function getCallbackForTypeName(setFilterList) {
        return (checked) => {
          if (checked) {
            setFilterList((set) => {
              set.add(elem.ID);
              return new Set(set);
            });
          } else {
            setFilterList((set) => {
              set.delete(elem.ID);
              return new Set(set);
            });
          }
        };
      }

      let callback;
      switch (typename) {
        case "genre": {
          callback = getCallbackForTypeName(setGenreFilter);
          break;
        }
        case "theme": {
          callback = getCallbackForTypeName(setThemeFilter);
          break;
        }
        case "studio": {
          callback = getCallbackForTypeName(setStudioFilter);
          break;
        }
        case "producer": {
          callback = getCallbackForTypeName(setProducerFilter);
          break;
        }
        case "demographics": {
          callback = getCallbackForTypeName(setDemographicsFilter);
          break;
        }
        case "type": {
          callback = getCallbackForTypeName(setTypeFilter);
          break;
        }
        default:
          break;
      }

      res.push(
        <TypeButton
          TypeName={typename}
          TypeID={elem.ID}
          AnimeName={elem.Name === "" ? "Unknown" : elem.Name.toString()}
          onChecked={callback}
        />
      );
    }

    return res;
  }

  return (
    <div id="contentSearch">
      <div id="SearchDiv">
        <div id="SearchBarDiv">
          <input
            type="text"
            id="SearchbarLarge"
            onKeyDown={searchBarOnKeyDown}
            defaultValue={searchPhrase}
            ref={searchBar}
            placeholder="Search..."
          />
          <input
            type="submit"
            onClick={clearBtnOnClick}
            id="SearchbtnLarge" // FIXME: ID
            value="Clear"
          />
        </div>
        <div id="SearchResults">
          {Animes.map((anime) => {
            return <AnimePanel AnimeID={anime.AnimeID} key={anime.AnimeID} />;
          })}
        </div>
      </div>
      <div id="AnimeTypeDiv">
        <h3 className="FilterCategoryHeader">
          Genres
          <i class="arrow right"></i>
        </h3>
        <div class="AnimeTypeBtnDiv">{renderButtons("genre", Genres)}</div>
        <h3 className="FilterCategoryHeader">
          Themes
          <i class="arrow right"></i>
        </h3>
        <div class="AnimeTypeBtnDiv">{renderButtons("theme", Themes)}</div>
        <h3 className="FilterCategoryHeader">
          Studios
          <i class="arrow right"></i>
        </h3>
        <div class="AnimeTypeBtnDiv">{renderButtons("studio", Studios)}</div>
        <h3 className="FilterCategoryHeader">
          Producers
          <i class="arrow right"></i>
        </h3>
        <div class="AnimeTypeBtnDiv">
          {renderButtons("producer", Producers)}
        </div>
        <h3 className="FilterCategoryHeader">
          Demographics
          <i class="arrow right"></i>
        </h3>
        <div class="AnimeTypeBtnDiv">
          {renderButtons("demographics", Demographics)}
        </div>
        <h3 className="FilterCategoryHeader">
          Types
          <i class="arrow right"></i>
        </h3>
        <div class="AnimeTypeBtnDiv">{renderButtons("type", Types)}</div>
      </div>
    </div>
  );
}

export default Search;
