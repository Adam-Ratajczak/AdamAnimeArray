import axios from "axios";

export async function fetch_to_server(url, body){
    const response = await fetch({
        method: 'get',
        url: url,
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         },
        body: JSON.stringify(body)
      });

    return response.json();
}

export function get_type(id = -1){
    if(id < 0){
        return fetch_to_server("http://localhost:2137/animes/filters/types", {});
    }else{
        return fetch_to_server("http://localhost:2137/animes/filters/types/" + id.toString(), {});
    }
}

export function get_genre(id = -1){
    if(id < 0){
        return fetch_to_server("http://localhost:2137/animes/filters/genres", {});
    }else{
        return fetch_to_server("http://localhost:2137/animes/filters/genres/" + id.toString(), {});
    }
}

export function get_producer(id = -1){
    if(id < 0){
        return fetch_to_server("http://localhost:2137/animes/filters/producers", {});
    }else{
        return fetch_to_server("http://localhost:2137/animes/filters/producers/" + id.toString(), {});
    }
}

export function get_demographics(id = -1){
    if(id < 0){
        return fetch_to_server("http://localhost:2137/animes/filters/demographics", {});
    }else{
        return fetch_to_server("http://localhost:2137/animes/filters/demographics/" + id.toString(), {});
    }
}