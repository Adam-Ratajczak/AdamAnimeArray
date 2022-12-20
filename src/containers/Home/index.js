import React, {Component} from 'react'
import {Menubar} from '../../widgets'
import {get_genre} from '../../db_module';

class Home extends Component {
  constructor() {
    super();
    
    let arr = window.location.href.split("/");
    let href = arr[arr.length - 1];
    
    let res = get_genre();

    console.log(res);
  }

  render() {
    return (
      <div id="main">
        <Menubar/>
        <div id="content">
          <h1 id="main_header"></h1>
        </div>
      </div>
    )
  }
}

export default Home