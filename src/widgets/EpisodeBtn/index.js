import './style.scss'
import { NavLink } from "react-router-dom";

function EpisodeBtn(props){
    let btns = [];

    for(let i = 1; i <= props.EpisodeCount; i++){
        if(i == props.EpisodeNum){
            btns.push((<NavLink to={"/anime/" + props.AnimeID + "/ep/" + i}><div class="EpBtn EpBtnSelected"><h3>{i}</h3></div></NavLink>))
        }else{
            btns.push((<NavLink to={"/anime/" + props.AnimeID + "/ep/" + i}><div class="EpBtn EpBtnRegular"><h3>{i}</h3></div></NavLink>))
        }
    }

    return (
        <div class="EpBtnContainer">
            {btns}
        </div>
    )
}

export default EpisodeBtn;
