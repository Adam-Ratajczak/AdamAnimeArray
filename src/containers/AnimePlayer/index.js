import React, { useState, useEffect } from "react";
import { Menubar, EpisodeBtn } from "../../widgets";
import { GetAnime, GetEpisodes } from "../../db_module";
import redirect from "../../redirect";
import "./style.scss";
import { NavLink, useParams } from "react-router-dom";

function AnimePlayer() {
  const { AnimeID, EpID } = useParams();

  const [AnimeTitle, SetAnimeTitle] = useState("");
  const [EpisodeTitle, SetEpisodeTitle] = useState("");
  const [Aired, SetAired] = useState(0);
  const [PlayerUrl, SetPlayerUrl] = useState("");
  const [EpisodeNum, SetEpisodeNum] = useState(0);

  useEffect(() => {
    SetPlayerUrl("");
    GetAnime(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        SetAnimeTitle(result.AnimeTitle);
      });
    GetEpisodes(AnimeID)
      .then((response) => response.json())
      .then((result) => {
        if (EpID > result.length) {
          redirect("/anime/" + AnimeID);
        }

        SetEpisodeNum(result.length);
      });
    GetEpisodes(AnimeID, EpID)
      .then((response) => response.json())
      .then((result) => {
        SetEpisodeTitle(result.Title);
        console.log("result", result);
        SetAired(result.Aired);
        SetPlayerUrl(result.PlayerUrl);
      });
  }, [AnimeID, EpID]);

  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  console.log("PLAYER URL: ", AnimeID, EpID, PlayerUrl);
  return (
    <div id="main">
      <Menubar />
      <div id="PlayerContent">
        <div id="PlayerHeaders">
          <NavLink to={"/anime/" + AnimeID}>
            <h1>{AnimeTitle + " (ep. " + EpID + ")"}</h1>
          </NavLink>
          <p>
            <q>{EpisodeTitle}</q>{" "}
            {Aired.Valid
              ? " - " +
                new Date(Aired.Time).toLocaleDateString("en-EN", options)
              : ""}
          </p>
        </div>
        <iframe
          id="Player"
          title="Player"
          src={PlayerUrl}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen=""
        ></iframe>
      </div>
      <div id="EpisodeList">
        <div id="EpisodeBtnWidget">
          <EpisodeBtn
            AnimeID={AnimeID}
            EpisodeNum={EpID}
            EpisodeCount={EpisodeNum}
          />
        </div>
      </div>
    </div>
  );
}

export default AnimePlayer;
