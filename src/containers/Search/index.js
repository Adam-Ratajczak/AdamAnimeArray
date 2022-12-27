import React, {Component, useEffect, useState} from 'react'
import {AnimePanel, Menubar} from '../../widgets'
import {GetDemographics, GetGenre, GetProducer, GetTheme, GetType} from '../../db_module';
import './style.scss'

class TypeButton extends Component{
  constructor(){
    super();
    this.ChangeState = this.ChangeState.bind(this);
  }

  ChangeState(){
    
  }

  render(){
    let cb_id = "cb" + this.props.AnimeID.toString();

    return (
      <div class="CoolButtonDiv">
        <input type="checkbox" class="CoolButtonCb" id={cb_id} name={cb_id} onChange={this.ChangeState} value={this.props.AnimeID}/>
        <label class="CoolButton" for={cb_id}>
        {this.props.AnimeName}
        </label>
      </div>
    )
  }
}

function Search(){
  const [Genres, SetGenres] = useState(0);
  const [Themes, SetThemes] = useState(0);
  const [Producers, SetProducers] = useState(0);
  const [Demographics, SetDemographics] = useState(0);
  const [Types, SetTypes] = useState(0);

  function GetButtons(result){
    result.sort((a, b) => {
      return a.Name > b.Name;
    });

    let res = [];
    for(let elem of result){
      res.push((<TypeButton AnimeID={elem.ID} AnimeName={elem.Name.toString()}/>))
    }

    return res;
  }

  useEffect(() => GetGenre()
  .then((response) => response.json())
  .then((result) =>{
    const res = GetButtons(result);

    SetGenres(res);
  }), []);

  useEffect(() => GetTheme()
  .then((response) => response.json())
  .then((result) =>{
    const res = GetButtons(result);

    SetThemes(res);
  }), []);

  useEffect(() => GetProducer()
  .then((response) => response.json())
  .then((result) =>{
    const res = GetButtons(result);

    SetProducers(res);
  }), []);

  useEffect(() => GetDemographics()
  .then((response) => response.json())
  .then((result) =>{
    const res = GetButtons(result);

    SetDemographics(res);
  }), []);

  useEffect(() => GetType()
  .then((response) => response.json())
  .then((result) =>{
    let res = [];
    for(let elem of result){
      res.push((<TypeButton AnimeID={elem.ID} AnimeName={elem.Name.toString()}/>))
    }

    SetTypes(res);
  }), []);

  return (
    <div id="main">
      <Menubar/>
      <div id="contentSearch">
        <div id="SearchDiv">
          <div id="SearchBarDiv">
            <input type="text" id="SearchbarLarge" placeholder="Search..."></input>
            <input type="button" id="SearchbtnLarge" value="Find"></input>
          </div>
          <div id="SearchResults">
            <AnimePanel AnimeID="305"/>
            <AnimePanel AnimeID="2"/>
          </div>
        </div>
        <div id="AnimeTypeDiv">
          <h3>Genres:</h3>
          <div class="AnimeTypeBtnDiv">
            {Genres}
          </div>
          <h3>Themes:</h3>
          <div class="AnimeTypeBtnDiv">
            {Themes}
          </div>
          <h3>Demographics:</h3>
          <div class="AnimeTypeBtnDiv">
            {Demographics}
          </div>
          <h3>Types:</h3>
          <div class="AnimeTypeBtnDiv">
            {Types}
          </div>
          <h3>Producers:</h3>
          <div class="AnimeTypeBtnDiv">
            {Producers}
          </div>
        </div>
      </div>
    </div>
    )
  }

export default Search