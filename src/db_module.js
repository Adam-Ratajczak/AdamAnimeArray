async function FetchToApiGet(url) {
  const result = await fetch("http://localhost:2138/" + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return result;
}
async function FetchToApiPost(url, con) {
  const result = await fetch("http://localhost:2138/" + url, {
    method: "POST",
    body: JSON.stringify(con),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return result;
}

export async function GetType(id = -1) {
  if (id < 0) {
    return FetchToApiGet(`animes/filters/types`);
  } else {
    return FetchToApiGet(`animes/filters/types/` + id.toString());
  }
}

export async function GetGenre(id = -1) {
  if (id < 0) {
    return FetchToApiGet(`animes/filters/genres`);
  } else {
    return FetchToApiGet(`animes/filters/genres/` + id.toString());
  }
}

export async function GetTheme(id = -1) {
  if (id < 0) {
    return FetchToApiGet(`animes/filters/themes`);
  } else {
    return FetchToApiGet(`animes/filters/themes/` + id.toString());
  }
}

export async function GetProducer(id = -1) {
  if (id < 0) {
    return FetchToApiGet(`animes/filters/producers`);
  } else {
    return FetchToApiGet(`animes/filters/producers/` + id.toString());
  }
}

export async function GetDemographics(id = -1) {
  if (id < 0) {
    return FetchToApiGet(`animes/filters/demographics`);
  } else {
    return FetchToApiGet(`animes/filters/demographics/` + id.toString());
  }
}

export async function GetAnime(id = -1) {
  if (id < 0) {
    return FetchToApiGet(`animes/`);
  } else {
    return FetchToApiGet(`animes/` + id.toString());
  }
}

export async function GetAnimeGenres(id) {
  return FetchToApiGet(`animes/` + id.toString() + "/genres");
}

export async function GetAnimeThemes(id) {
  return FetchToApiGet(`animes/` + id.toString() + "/themes");
}

export async function GetAnimeProducers(id) {
  return FetchToApiGet(`animes/` + id.toString() + "/producers");
}

export async function GetAnimeDemographics(id) {
  return FetchToApiGet(`animes/` + id.toString() + "/demographics");
}

export async function GetAnimeType(id) {
  return FetchToApiGet(`animes/` + id.toString() + "/type");
}

export async function GetFilterEntry(id) {
  return FetchToApiGet(`animes/` + id.toString() + "/filterentry");
}

export async function GetEpisodes(AnimeID, id = -1) {
  if (id < 0) {
    return FetchToApiGet(`animes/` + AnimeID.toString() + `/episodes`);
  } else {
    return FetchToApiGet(
      `animes/` + AnimeID.toString() + `/episodes/` + id.toString()
    );
  }
}

export async function FilterAnimes(
  name,
  types,
  genres,
  themes,
  producers,
  demographics
) {
  let req = {
    Title: name,
    Types: types,
    Genres: genres,
    Themes: themes,
    Producers: producers,
    Demographics: demographics,
  };

  return FetchToApiPost("animes/filter", req);
}

export async function CreateUser(Name, Password, Email) {
  let req = {
    UserName: Name,
    UserEmail: Email,
    UserPassword: Password,
  };

  return FetchToApiPost("auth/signup", req);
}

export async function LoginUser(Name, Password) {
  let req = {
    UserName: Name,
    UserPassword: Password,
  };

  return FetchToApiPost("auth/login", req);
}

export async function LogoutUser(id, token) {
  let req = {
    UserID: id,
    Token: token,
  };

  return FetchToApiPost("auth/logout", req);
}

export async function GetUserInfo(id) {
  let req = {
    UserID: id,
    Token: undefined,
  };

  return FetchToApiPost("auth/changeinfo", req);
}

export async function ChangeUserInfo(
  token,
  Name,
  Email,
  ProfileUrl,
  ProfilePoster
) {
  let req = {
    Token: token,
    UserName: Name,
    UserEmail: Email,
    UserProfileImageUrl: ProfileUrl,
    UserProfileImagePoster: ProfilePoster,
  };

  return FetchToApiPost("auth/changeinfo", req);
}
