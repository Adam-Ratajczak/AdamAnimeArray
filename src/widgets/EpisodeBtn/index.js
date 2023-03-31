import './style.scss'

function EpisodeBtn(props){
    let btns = [];

    for(let i = 1; i <= props.EpisodeCount; i++){
        if(i == props.EpisodeNum){
            btns.push((<a href={"/anime/" + props.AnimeID + "/ep/" + i}><div class="EpBtn EpBtnSelected"><h3>{i}</h3></div></a>))
        }else{
            btns.push((<a href={"/anime/" + props.AnimeID + "/ep/" + i}><div class="EpBtn EpBtnRegular"><h3>{i}</h3></div></a>))
        }
    }

    return (
        <div class="EpBtnContainer">
            {btns}
        </div>
    )
}

export default EpisodeBtn;