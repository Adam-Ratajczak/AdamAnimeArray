import React, {useEffect, useState} from 'react'
import {Menubar} from '../../widgets'
import {GetGenre} from '../../db_module';

function Home() {
  useEffect(() => {
   GetGenre()
    .then((response) => console.log(response.json()));
  }, []);

  return (
    <div id="main">
      <Menubar/>
      <div id="content">
        <h1 id="main_header"></h1>
      </div>
    </div>
  )
}

export default Home