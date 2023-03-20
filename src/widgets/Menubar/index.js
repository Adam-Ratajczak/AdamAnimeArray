import React, {Component} from 'react'
import LoginMan from '../../login_manager.js';
import redirect from '../../redirect.js'
import './style.scss';
import { NavLink } from "react-router-dom";

function LoginBtn(){
  let btns = 0;
  let info = false;
  console.log(LoginMan.UserID())
  LoginMan.userinfo()
  .then((response) => response.status == 202 ? response.json() : false)
  .then((result) => {
    console.log(result);
    info = result;
  });

  if(!LoginMan.LoggedIn()){
    btns = (
      <div id="LoginBox">
        <NavLink id="SignUpBtn" to="/SignUp">Sign up</NavLink>
        <NavLink id="LoginBtn" to="/Login">Login</NavLink>
      </div>
    );
  }else{
    btns = (
      <div id="LoginBox">
        <NavLink id="SignUpBtn" to="/">{}</NavLink>
      </div>
    )
  }

  return btns;
}

class Menubar extends Component{
  render(){
    return (
      <div id="content">
        <LoginBtn />
        <div id="HeaderContent">
          <h1 id="aaaHeader">AdamAnimeArray</h1>
          <form id="Search">
            <input type="submit" id="Searchbtn" value=""></input>
            <input type="text" id="Searchbar" placeholder="Search..."></input>
          </form>
        </div>
        <div id="MenuContent">
          <NavLink to='/Popular'><div class="Button" id="anime_top_ranked"><p>Top Ranked</p></div></NavLink>
          <NavLink to='/Newest'><div class="Button" id="anime_newest"><p>Newest</p></div></NavLink>
          <NavLink to='/Recomended'><div class="Button" id="anime_recomended"><p>Recomended</p></div></NavLink>
          <NavLink to='/Random'><div class="Button" id="anime_random"><p>Random</p></div></NavLink>
        </div>
      </div>
    )
  }

  componentDidMount(){
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
