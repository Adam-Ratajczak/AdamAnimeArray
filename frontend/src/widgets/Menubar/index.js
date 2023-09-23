import React, { useEffect, useState } from "react";
import LoginMan from "../../login_manager.js";
import redirect from "../../redirect.js";
import "./style.scss";
import UserDefaultSVG from "./userdefault.js";
import { applyEffect } from 'fluent-reveal-effect';

function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      setUserInfo(await LoginMan.getBasicInfo());
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
    <div className="Loading"></div>
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
  const [history, setHistory] = useState([])

  useEffect(() => {
    let searchbar = document.getElementById("Searchbar");
    document.getElementById("Search").addEventListener("submit", (event) => {
      let searchphraze = searchbar.value;

      if (searchphraze.length == 0) {
        searchphraze = "*";
      }

      redirect("/Search/" + searchphraze);

      event.preventDefault();
    });

    document.getElementById("ClearHistory").addEventListener("click", (event) => {
      (async () => {
        await LoginMan.historyClear()
      })();

      window.location.reload()
    });

    let historylist = document.getElementById("HistoryList");

    searchbar.onclick = () => {
      if(history.length > 0){ 
        historylist.style.display = "flex";
      }
    }

    searchbar.onmouseleave = () => {
      historylist.style.display = "none";
    }

    historylist.onmouseenter = () => {
      historylist.style.display = "flex";
    }

    historylist.onmouseleave = () => {
      historylist.style.display = "none";
    }

    applyEffect('#MainBtn', {
      // clickEffect: true,
      lightColor: 'rgba(255,255,255,0.6)',
      gradientSize: 80,
      isContainer: true,
      children: {
        borderSelector: '.btn-border',
        elementSelector: '.btn',
        lightColor: 'rgba(255,255,255,0.3)',
        gradientSize: 150
      }
    });
  });

  useEffect(() => {
    if (LoginMan.LoggedIn()) {
      (async () => {
        setHistory(await LoginMan.getHistory());
      })();
    }
  }, [])

  return (
    <div>
      <div id="MenuBar">
        <a href="/" id="MainBtn"><div className="btn"></div></a>
        <form id="Search">
          <input type="submit" id="Searchbtn" value=""></input>
          <input type="text" id="Searchbar" placeholder="Search..." autoComplete="off"></input>
        </form>
        <LoginBtn />
      </div>
      <div id="HistoryList">
        <a href="" id="ClearHistory">Clear history</a>
        {history.map((elem) => {
          return (<a href={"/anime/" + elem.AnimeID}>
            <div class="HistoryEntry">
              <img src={elem.PosterURL} />
              <h2>{elem.AnimeTitle}</h2>
            </div>
          </a>)
        })}
      </div>
    </div>
  );
}

export default Menubar;
