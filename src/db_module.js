const port = 2137

function FetchToApiGet(url){
    return fetch('http://localhost:' + port.toString() + url, { 
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*'
        }});
}
function FetchToApiPost(url, con){
    return fetch('http://localhost:' + port.toString() + url, { 
        method: 'POST', 
        body: JSON.stringify(con), 
        headers: {
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*'
        }});
}

export function GetType(id = -1){
    if(id < 0){
        return FetchToApiGet(`/animes/filters/types`);
    }else{
        return FetchToApiGet(`/animes/filters/types/` + id.toString());
    }
}

export function GetGenre(id = -1){
    if(id < 0){
        return FetchToApiGet(`/animes/filters/genres`);
    }else{
        return FetchToApiGet(`/animes/filters/genres/` + id.toString());
    }
}

export function GetTheme(id = -1){
    if(id < 0){
        return FetchToApiGet(`/animes/filters/themes`);
    }else{
        return FetchToApiGet(`/animes/filters/themes/` + id.toString());
    }
}

export function GetStudio(id = -1){
    if(id < 0){
        return FetchToApiGet(`/animes/filters/studios`);
    }else{
        return FetchToApiGet(`/animes/filters/studios/` + id.toString());
    }
}

export function GetProducer(id = -1){
    if(id < 0){
        return FetchToApiGet(`/animes/filters/producers`);
    }else{
        return FetchToApiGet(`/animes/filters/producers/` + id.toString());
    }
}

export function GetDemographics(id = -1){
    if(id < 0){
        return FetchToApiGet(`/animes/filters/demographics`);
    }else{
        return FetchToApiGet(`/animes/filters/demographics/` + id.toString());
    }
}

export function GetAnime(id = -1){
    if(id < 0){
        return FetchToApiGet(`/animes/`);
    }else{
        return FetchToApiGet(`/animes/` + id.toString());
    }
}

export function GetDbInfo(){
    return FetchToApiGet(`/info`);
}

export function GetAnimeRange(begin, end, mode){
    let req = {
        AnimeBegin: begin,
        AnimeEnd: end,
        Mode: mode
    };
    
    return FetchToApiPost(`/animes/`, req);
}

export function GetRelations(id = -1){
    if(id < 0){
        return FetchToApiGet(`/animes/relations`);
    }else{
        return FetchToApiGet(`/animes/relations/` + id.toString());
    }
}

export function GetAnimeGenres(id){
    return FetchToApiGet(`/animes/` + id.toString() + `/genres`);
}

export function GetAnimeThemes(id){
    return FetchToApiGet(`/animes/` + id.toString() + `/themes`);
}

export function GetAnimeStudios(id){
    return FetchToApiGet(`/animes/` + id.toString() + `/studios`);
}

export function GetAnimeProducers(id){
    return FetchToApiGet(`/animes/` + id.toString() + `/producers`);
}

export function GetAnimeDemographics(id){
    return FetchToApiGet(`/animes/` + id.toString() + `/demographics`);
}

export function GetAnimeType(id){
    return FetchToApiGet(`/animes/` + id.toString() + `/type`);
}

export function GetFilterEntry(id){
    return FetchToApiGet(`/animes/` + id.toString() + `/filterentry`);
}

export function GetAnimeRelations(id){
    return FetchToApiGet(`/animes/` + id.toString() + `/relations`);
}

export function GetEpisodes(AnimeID, id = -1){
    if(id < 0){
        return FetchToApiGet(`/animes/` + AnimeID.toString() + `/episodes`);
    }else{
        return FetchToApiGet(`/animes/` + AnimeID.toString() + `/episodes/` + id.toString());
    }
}

export function GetEpisodeLanguages(AnimeID, id){
    return FetchToApiGet(`/animes/` + AnimeID.toString() + `/episodes/` + id.toString() + `/languages`);
}

export function GetPlayers(AnimeID, id, lang = ''){
    if(lang == ``){
        return FetchToApiGet(`/animes/` + AnimeID.toString() + `/episodes/` + id.toString() + `/players`);
    }else{
        return FetchToApiGet(`/animes/` + AnimeID.toString() + `/episodes/` + id.toString() + `/players/` + lang);
    }
}

export function GetSongs(AnimeID, id){
    return FetchToApiGet(`/animes/` + AnimeID.toString() + `/episodes/` + id.toString() + `/songs`);
}

export function FilterAnimes(ABegin, AEnd, name, types, genres, themes, studios, producers, demographics){
    let req = {
        ABegin: ABegin,
        AEnd: AEnd,
        Title: name,
        Types: types,
        Genres: genres,
        Themes: themes,
        Studios: studios,
        Producers: producers,
        Demographics: demographics
    };
    
    return FetchToApiPost(`/animes/filter`, req);
}

export function CreateUser(Name, Password, Email){
    let req = {
        UserName: Name,
        UserEmail: Email,
        UserPassword: Password
    };
    
    return FetchToApiPost(`/auth/signup`, req);
}

export function LoginUser(Name, Password){
    let req = {
        UserName: Name,
        UserPassword: Password
    };
    
    return FetchToApiPost(`/auth/login`, req);
}

export function LogoutUser(id, token){
    let req = {
        UserID: id,
        Token: token,
    };
    
    return FetchToApiPost(`/auth/logout`, req);
}

export function GetWatchlist(id, token){
    let req = {
        UserID: id,
        Token: token,
    };
    
    return FetchToApiPost(`/auth/watchlist`, req);
}

export function AddToWatchlist(token, AnimeID){
    let req = {
        Token: token,
        AnimeID: AnimeID,
    };
    
    return FetchToApiPost(`/auth/watchlist/add`, req);
}

export function RemoveFromWatchlist(token, AnimeID){
    let req = {
        Token: token,
        AnimeID: AnimeID,
    };
    
    return FetchToApiPost(`/auth/watchlist/remove`, req);
}

export function GetUserInfo(id){
    let req = {
        UserID: id,
        Token: undefined
    };
    
    return FetchToApiPost(`/auth/user`, req);
}

export function ChangeUserInfo(token, Name, Email, ProfileUrl, ProfilePoster){
    let req = {
        Token: token,
        UserName: Name,
        UserEmail: Email,
        UserProfileImageUrl: ProfileUrl,
        UserProfileImagePoster: ProfilePoster
    };
    
    return FetchToApiPost(`/auth/changeinfo`, req);
}

export function WriteChat(token, id, reply, chattext){
    let req = {
        Token: token,
        AnimeID: id,
        OtherID: reply,
        CommentText: chattext
    };
    
    return FetchToApiPost(`/auth/comment/write`, req);
}

export function ChangeProgress(token, id, EpNr, Progress){
    let req = {
        Token: token,
        AnimeID: id,
        EpNum: EpNr,
        Mode: Progress
    };
    
    return FetchToApiPost(`/auth/progress`, req);
}

export function GetProgress(token, id){
    let req = {
        Token: token,
        AnimeID: id
    };
    
    return FetchToApiPost(`/auth/progress/get`, req);
}

export function ClearProgress(token, id){
    let req = {
        Token: token,
        AnimeID: id
    };
    
    return FetchToApiPost(`/auth/progress/rem`, req);
}