import React, {Component} from 'react'
import {AnimePanel, Menubar} from '../../widgets'
import {GetGenre} from '../../db_module';
import './style.scss'

function Search(){
  // useEffect(() => {
  //   GetGenre()
  //   .then((response) => response.json())
  //   .then((result) => {
  //     genreContainer = result;
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  //  }, []);

  return (
    <div id="main">
      <Menubar/>
      <div id="contentSearch">
        <div id="SearchDiv">
          <div id="SearchBarDiv">
            <input type="text" id="SearchbarLarge" placeholder="Search..."></input>
            <input type="button" id="SearchbtnLarge" value="Find"></input>
          </div>
          <div id="SearchResults">
            <AnimePanel AnimeID="305"/>
            <AnimePanel AnimeID="2"/>
          </div>
        </div>
        <div id="AnimeTypeDiv">

        </div>
      </div>
    </div>
    )
  }

export default Search