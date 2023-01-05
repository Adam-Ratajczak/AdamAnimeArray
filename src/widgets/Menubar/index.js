import React, {Component} from 'react'
import redirect from '../../redirect.js'
import './style.scss';

class Menubar extends Component{
  render(){
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

  componentDidMount(){
    document.getElementById("anime_top_ranked").addEventListener("click", (event) =>{
      redirect("/Popular")

    });
    document.getElementById("anime_newest").addEventListener("click", (event) =>{
      redirect("/Newest")

    });
    document.getElementById("anime_recomended").addEventListener("click", (event) =>{
      redirect("/Recomended")

    });
    document.getElementById("anime_random").addEventListener("click", (event) =>{
      redirect("/Random")

    });
    document.getElementById("Search").addEventListener("submit", (event) =>{
      let searchphraze = document.getElementById("Searchbar").value;

      if(searchphraze.length == 0){
        searchphraze = "*";
      }

      redirect("/Search/" + searchphraze)

      event.preventDefault()
    });
  }
}

export default Menubar