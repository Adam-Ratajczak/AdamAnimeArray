import react, {} from 'react';
import redirect from '../../redirect';
import './style.scss'

function EpisodeBtn(props){
    const onClick = (index) =>{
        redirect("/anime/" + props.AnimeID + "/ep/" + index);
    }
    let btns = [];

    for(let i = 1; i <= props.EpisodeCount; i++){
        if(i == props.EpisodeNum){
            btns.push((<div class="EpBtn EpBtnSelected" onClick={() => onClick(i)}><h3>{i}</h3></div>))
        }else{
            btns.push((<div class="EpBtn EpBtnRegular" onClick={() => onClick(i)}><h3>{i}</h3></div>))
        }
    }

    return (
        <div class="EpBtnContainer">
            {btns}
        </div>
    )
}

export default EpisodeBtn;