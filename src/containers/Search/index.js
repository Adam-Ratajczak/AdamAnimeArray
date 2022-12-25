import React, {Component} from 'react'
import {Menubar} from '../../widgets'
import {GetGenre} from '../../db_module';

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
      <div id="content">
        <h1 id="main_header"></h1>
      </div>
    </div>
    )
  }

export default Search