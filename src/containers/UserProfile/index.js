import React, { useState, useEffect } from "react";
import "./style.scss";
import LoginMan from "../../login_manager";
import { redirect } from "react-router-dom";
import { AnimePoster } from "../../widgets";
import minus from "./minus.png";
import change_theme from "../../themes";

function UserProfile() {
  useEffect(() => {
    (async () => {
      change_theme(document.getElementById("SampleAnimeList"))
    })()
    
    if (!LoginMan.LoggedIn()) {
      redirect("/")
    }
  });

  return (
    <>
      <div id="content">
        
      </div>
    </>
  );
}

export default UserProfile;
