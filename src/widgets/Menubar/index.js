import React, { useEffect, useState } from "react";
import LoginMan from "../../login_manager.js";
import redirect from "../../redirect.js";
import { GetAnimeRange } from "../../db_module.js";
import "./style.scss";
import UserDefaultSVG from "./userdefault.js";
import HeaderBg from "./headerbg.png"

function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      setUserInfo(await LoginMan.fetchUserInfo());
    })();
  }, []);

  function renderUserProfileButton() {
    return (
      <>
        {userInfo.UserProfileImageUrl.Valid ? (
          <img
            src={userInfo.UserProfileImageUrl.String}
            alt="User profile"
          ></img>
        ) : (
          <UserDefaultSVG />
        )}

        {userInfo.UserName}
      </>
    );
  }

  // TODO: User profile page
  return userInfo ? (
    <a id="UserInfo" href="/UserProfile">
      {renderUserProfileButton()}
    </a>
  ) : (
    <div class="Loading"></div>
  );
}

function LoginBtn() {
  let btns = 0;

  async function logout() {
    await LoginMan.logout();
    // FIXME: Avoid this.
    window.location.reload();
  }

  if (!LoginMan.LoggedIn()) {
    btns = (
      <div id="LoginBox">
        <a id="SignUpBtn" href="/SignUp">
          Sign up
        </a>
        <a id="LoginBtn" href="/Login">
          Login
        </a>
      </div>
    );
  } else {
    btns = (
      <div id="LoginBox">
        <UserInfo />
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return btns;
}

function Menubar() {
  useEffect(() => {
    document.getElementById("Search").addEventListener("submit", (event) => {
      let searchphraze = document.getElementById("Searchbar").value;

      if (searchphraze.length == 0) {
        searchphraze = "*";
      }

      redirect("/Search/" + searchphraze);

      event.preventDefault();
    });

    document.getElementById("random").addEventListener("click", (ev) => {
      GetAnimeRange(0, 1, 2)
        .then((response) => response.json())
        .then((result) => {
          redirect("/Anime/" + result.Animes[0].AnimeID);
        });
    });
  });

  return (
    <div id="MenuBar">
      <LoginBtn />
      <div id="HeaderContent">
        <img src={HeaderBg}/>
        <h1 id="aaaHeader">AdamAnimeArray</h1>
        <form id="Search">
          <input type="submit" id="Searchbtn" value=""></input>
          <input type="text" id="Searchbar" placeholder="Search..." autocomplete="off"></input>
        </form>
      </div>
      <div id="MenuContent">
        <a href="/Popular">
          <div class="Button" id="anime_top_ranked">
            <p>Top Ranked</p>
          </div>
        </a>
        <a href="/Newest">
          <div class="Button" id="anime_newest">
            <p>Newest</p>
          </div>
        </a>
        <a href="/Recomended">
          <div class="Button" id="anime_recomended">
            <p>Recomended</p>
          </div>
        </a>
        <a id="random">
          <div class="Button" id="anime_random">
            <p>Random</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Menubar;
