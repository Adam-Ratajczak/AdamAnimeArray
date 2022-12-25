function FetchToApiGet(url, con){
    return fetch('http://localhost:2138/' + url, { 
        method: 'GET', 
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

export function GetAnimeGenres(id = -1){
    if(id < 0){
        return FetchToApiGet(`animes`);
    }else{
        return FetchToApiGet(`animes/` + id.toString());
    }
}

export function GetAnimeThemes(id = -1){
    if(id < 0){
        return FetchToApiGet(`animes`);
    }else{
        return FetchToApiGet(`animes/` + id.toString());
    }
}

export function GetAnimeProducers(id = -1){
    if(id < 0){
        return FetchToApiGet(`animes`);
    }else{
        return FetchToApiGet(`animes/` + id.toString());
    }
}

export function GetAnimeDemographics(id = -1){
    if(id < 0){
        return FetchToApiGet(`animes`);
    }else{
        return FetchToApiGet(`animes/` + id.toString());
    }
}

export function GetEpisodes(AnimeID, id = -1){
    if(id < 0){
        return FetchToApiGet(`animes/` + AnimeID.toString() + `/episodes`);
    }else{
        return FetchToApiGet(`animes/` + AnimeID.toString() + `/episodes` + id.toString());
    }
}