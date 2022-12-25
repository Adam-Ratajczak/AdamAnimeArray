import React from 'react'
import {Menubar} from '../../widgets'
import {GetAnime} from "../../db_module"
import redirect from '../../redirect'
import {OverlayTrigger} from "react-bootstrap";
import './style.scss';

var MappleToolTip = require('reactjs-mappletooltip');
function AnimeInfo(){
  return(

    <div id="main">
      <Menubar/>
      <div id="contentAnime">
      </div>
    </div>
  )
}

export default AnimeInfo