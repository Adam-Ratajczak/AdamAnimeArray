import React, {Component} from 'react'
import './style.scss';

class Menubar extends Component {
  render() {
    return (
      <div id="content">
        <div id="HeaderContent">
          <h1 id="aaaHeader">AdamAnimeArray</h1>
          <form id="Search">
            <input type="submit" id="Searchbtn" value=""></input>
            <input type="text" id="Searchbar" placeholder="Search..."></input>
          </form>
        </div>
        <div id="MenuContent">
          <div class="Button" id="anime_top_ranked"><p>Top Ranked</p></div>
          <div class="Button" id="anime_newest"><p>Newest</p></div>
          <div class="Button" id="anime_recomended"><p>Recomended</p></div>
          <div class="Button" id="anime_random"><p>Random</p></div>
        </div>
      </div>
    )
  }
}

export default Menubar