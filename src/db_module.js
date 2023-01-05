function FetchToApiGet(url){
    return fetch('http://localhost:2138/' + url, { 
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json', 
            "Access-Control-Allow-Origin": "*"
        }});
}
function FetchToApiPost(url, con){
    return fetch('http://localhost:2138/' + url, { 
        method: 'POST', 
        body: JSON.stringify(con), 
        headers: {
            'Content-Type': 'application/json', 
            "Access-Control-Allow-Origin": "*"
        }});
}

export function GetType(id = -1){
    if(id < 0){
        return FetchToApiGet(`animes/filters/types`);
    }else{
        return FetchToApiGet(`animes/filters/types/` + id.toString());
    }
}

export function GetGenre(id = -1){
    if(id < 0){
        return FetchToApiGet(`animes/filters/genres`);
    }else{
        return FetchToApiGet(`animes/filters/genres/` + id.toString());
    }
}

export function GetTheme(id = -1){
    if(id < 0){
        return FetchToApiGet(`animes/filters/themes`);
    }else{
        return FetchToApiGet(`animes/filters/themes/` + id.toString());
    }
}

export function GetProducer(id = -1){
    if(id < 0){
        return FetchToApiGet(`animes/filters/producers`);
    }else{
        return FetchToApiGet(`animes/filters/producers/` + id.toString());
    }
}

export function GetDemographics(id = -1){
    if(id < 0){
        return FetchToApiGet(`animes/filters/demographics`);
    }else{
        return FetchToApiGet(`animes/filters/demographics/` + id.toString());
    }
}

export function GetAnime(id = -1){
    if(id < 0){
        return FetchToApiGet(`animes/`);
    }else{
        return FetchToApiGet(`animes/` + id.toString());
    }
}

export function GetAnimeGenres(id){
    return FetchToApiGet(`animes/` + id.toString() + "/genres");
}

export function GetAnimeThemes(id){
    return FetchToApiGet(`animes/` + id.toString() + "/themes");
}

export function GetAnimeProducers(id){
    return FetchToApiGet(`animes/` + id.toString() + "/producers");
}

export function GetAnimeDemographics(id){
    return FetchToApiGet(`animes/` + id.toString() + "/demographics");
}

export function GetAnimeType(id){
    return FetchToApiGet(`animes/` + id.toString() + "/type");
}

export function GetFilterEntry(id){
    return FetchToApiGet(`animes/` + id.toString() + "/filterentry");
}

export function GetEpisodes(AnimeID, id = -1){
    if(id < 0){
        return FetchToApiGet(`animes/` + AnimeID.toString() + `/episodes`);
    }else{
        return FetchToApiGet(`animes/` + AnimeID.toString() + `/episodes/` + id.toString());
    }
}

export function FilterAnimes(name, types, genres, themes, producers, demographics){
    let req = {
        Title: name,
        Types: types,
        Genres: genres,
        Themes: themes,
        Producers: producers,
        Demographics: demographics
    };

    console.log(req);
    
    return FetchToApiPost("animes/filter", req);
}