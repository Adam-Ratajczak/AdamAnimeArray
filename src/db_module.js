export function GetType(id = -1){
    if(id < 0){
        return fetch(`http://localhost:2137/animes/filters/types`, {});
    }else{
        return fetch(`http://localhost:2137/animes/filters/types/` + id.toString(), {});
    }
}

export function GetGenre(id = -1){
    if(id < 0){
        return fetch(`http://localhost:2137/animes/filters/genres`, { mode: 'no-cors'});
    }else{
        return fetch(`http://localhost:2137/animes/filters/genres/` + id.toString(), {});
    }
}

export function GetProducer(id = -1){
    if(id < 0){
        return fetch(`http://localhost:2137/animes/filters/producers`, {});
    }else{
        return fetch(`http://localhost:2137/animes/filters/producers/` + id.toString(), {});
    }
}

export function GetDemographics(id = -1){
    if(id < 0){
        return fetch(`http://localhost:2137/animes/filters/demographics`, {});
    }else{
        return fetch(`http://localhost:2137/animes/filters/demographics/` + id.toString(), {});
    }
}