import React, { useState, useEffect } from "react";
import "./style.scss";
import LoginMan from "../../login_manager";
import { redirect } from "react-router-dom";

function UserProfile() {
  const [UserName, SetUserName] = useState(0)
  useEffect(() => {
    (async () => {
      const UserInfo = await LoginMan.fetchUserInfo()
      document.getElementById("content").style.backgroundImage = "url('" + UserInfo.UserProfileImagePoster.String + "')";
      SetUserName(UserInfo.UserName);
    })()
    
    if (!LoginMan.LoggedIn()) {
      redirect("/")
    }
  }, []);

  return (
    <>
      <div id="content">
        <h1 id="UserHeader">{"Hello " + UserName + "!"}</h1>
        <div id="UserMain">
          <h2>Settings:</h2>
          <form id="SettingsForm">
            <div>
              <label><span>Your email: </span><input type="text"/></label>
              <label><span>Your profile picture: </span><input type="file" accept="image/*" style={{display: "none"}}/><input type="button" value="Browse file..." style={{pointerEvents: "none"}}/></label>
              <label><span></span><input type="submit" value="Update profile..."/></label>
            </div>
            <label><span>Change background picture: </span><input type="button" value="Change..."/></label>
            <label><span>Change password: </span><input type="button" value="Change..."/></label>
            <label><span>Change language order: </span><input type="button" value="Change..."/></label>
            <label><span>Change theme: </span><input type="button" value="Change..."/></label>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
