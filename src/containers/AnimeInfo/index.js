import React from "react";
import { useParams, useLoaderData } from "react-router-dom";
import { Menubar, AnimePoster, EpisodeBtn } from "./../../widgets";
import {
  GetAnime,
  GetAnimeDemographics,
  GetAnimeGenres,
  GetAnimeProducers,
  GetAnimeThemes,
  GetAnimeType,
  GetEpisodes,
  GetFilterEntry,
  FilterAnimes,
} from "../../db_module";
import redirect from "../../redirect";
import "./style.scss";

export async function AnimeInfo_loader({ params }) {
  const AnimeID = params.AnimeID;
  let response = await GetFilterEntry(AnimeID);
  if (response.status !== 200) {
    redirect("/");
  }

  let result = await (await GetAnime(AnimeID)).json();
  const AnimeTitle = result.AnimeTitle;
  const AnimeDesc = result.AnimeDesc;
  const AiredBegin = result.AiredBegin;
  const AiredEnd = result.AiredEnd;
  const PosterURL = result.PosterURL;
  const Premiered = result.Premiered;

  result = await (await GetEpisodes(AnimeID)).json();
  const EpisodeNum = result.length;

  result = await (await GetAnimeGenres(AnimeID)).json();
  const AnimeGenres = result.map((e) => e.Name).join(", ");

  result = await (await GetAnimeThemes(AnimeID)).json();
  const AnimeThemes = result.map((e) => e.Name).join(", ");

  result = await (await GetAnimeProducers(AnimeID)).json();
  const AnimeProducers = result.map((e) => e.Name).join(", ");

  result = await (await GetAnimeDemographics(AnimeID)).json();
  const AnimeDemographics = result.map((e) => e.Name).join(", ");

  result = await (await GetAnimeType(AnimeID)).json();
  const AnimeType = result.Name;

  result = await (await GetFilterEntry(AnimeID)).json();

  const AnimeList = await (
    await FilterAnimes("", result.Types, result.Genres, result.Themes, [], [])
  ).json();
  let res = [];
  for (
    let i = 0;
    i <
    Math.min(AnimeList.length - 1, Math.floor(window.screen.width / 270) * 2);
    i++
  ) {
    let AnimeNum = Math.floor(
      (Math.random() * AnimeList.length) % AnimeList.length
    );
    let ID = AnimeList[AnimeNum].AnimeID;

    res.push(<AnimePoster AnimeID={ID} />);
  }
  const Animes = res;

  return {
    AnimeTitle,
    AnimeDesc,
    AiredBegin,
    AiredEnd,
    PosterURL,
    Premiered,
    EpisodeNum,
    AnimeType,
    AnimeGenres,
    AnimeThemes,
    AnimeProducers,
    AnimeDemographics,
    Animes,
  };
}

function AnimeInfo() {
  const {
    AnimeTitle,
    AnimeDesc,
    AiredBegin,
    AiredEnd,
    PosterURL,
    Premiered,
    EpisodeNum,
    AnimeType,
    AnimeGenres,
    AnimeThemes,
    AnimeProducers,
    AnimeDemographics,
    Animes,
  } = useLoaderData();

  const { AnimeID } = useParams();

  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const ABegin = new Date(AiredBegin.Time);
  const AEnd = new Date(AiredEnd.Time);

  return (
    <div id="main">
      <Menubar />
      <h1 id="AnimeInfoHeader">{AnimeTitle}</h1>
      <div id="AnimeInfoContent">
        <div id="AnimeDescContainer">
          <div id="AnimeInfoPosterContainer">
            <img src={PosterURL} id="AnimeInfoPoster" />
            <div>
              <h3 class="InfoHeader">General information:</h3>
              <table>
                <tbody>
                  <tr>
                    <td class="AnimePropertyName">Type: </td>
                    <td>{AnimeType ? AnimeType.toString() : "Unknown"}</td>
                  </tr>
                  <tr>
                    <td class="AnimePropertyName">Episodes: </td>
                    <td>{EpisodeNum ? EpisodeNum.toString() : "Unknown"}</td>
                  </tr>
                  <tr>
                    <td class="AnimePropertyName">Premiered: </td>
                    <td>{Premiered ? Premiered.toString() : "Unknown"}</td>
                  </tr>
                  <tr>
                    <td class="AnimePropertyName">Aired: </td>
                    <td>
                      {AiredBegin.Valid
                        ? ABegin.toLocaleDateString("en-EN", options)
                        : "Unknown"}
                    </td>
                  </tr>
                  <tr>
                    <td class="AnimePropertyName">Finished: </td>
                    <td>
                      {AiredEnd.Valid
                        ? AEnd.toLocaleDateString("en-EN", options)
                        : "Unknown"}
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 class="InfoHeader">Anime type:</h3>
              <table>
                <tbody>
                  <tr>
                    <td class="AnimePropertyName">Genres: </td>
                    <td>
                      {AnimeGenres != ""
                        ? AnimeGenres.toString().substring(
                            0,
                            AnimeGenres.toString().length - 2
                          )
                        : "None"}
                    </td>
                  </tr>
                  <tr>
                    <td class="AnimePropertyName">Themes: </td>
                    <td>
                      {AnimeThemes != ""
                        ? AnimeThemes.toString().substring(
                            0,
                            AnimeThemes.toString().length - 2
                          )
                        : "None"}
                    </td>
                  </tr>
                  <tr>
                    <td class="AnimePropertyName">Producers: </td>
                    <td>
                      {AnimeProducers != ""
                        ? AnimeProducers.toString().substring(
                            0,
                            AnimeProducers.toString().length - 2
                          )
                        : "None"}
                    </td>
                  </tr>
                  <tr>
                    <td class="AnimePropertyName">Demographics: </td>
                    <td>
                      {AnimeDemographics != ""
                        ? AnimeDemographics.toString().substring(
                            0,
                            AnimeDemographics.toString().length - 2
                          )
                        : "None"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            {AnimeDesc.toString()
              .split("<br>")
              .map((line) => {
                return <p>{line}</p>;
              })}
          </div>
        </div>
        <div id="AnimeInfoContainer">
          <h2 class="InfoHeader">Episodes:</h2>
          <EpisodeBtn
            AnimeID={AnimeID}
            EpisodeNum="0"
            EpisodeCount={EpisodeNum}
          />
        </div>
      </div>
      <h1 id="SimilliarAnimeHeader">You may also like: </h1>
      <div id="SimiliarAnimes">{Animes}</div>
    </div>
  );
}

export default AnimeInfo;
