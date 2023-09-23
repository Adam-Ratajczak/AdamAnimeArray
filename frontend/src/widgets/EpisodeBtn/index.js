import React, { useState, useEffect } from 'react'
import { GetEpisodes, GetProgress } from "../../db_module"
import './style.scss';
import LoginMan from '../../login_manager';
import change_theme from '../../themes';

function EpisodeBtn(props) {
    const [Eps, SetEps] = useState([])

    const AnimeID = props.AnimeID

    useEffect(() => {
        (async () => {
            let Progress = []

            await GetProgress(LoginMan.Token(), parseInt(AnimeID))
                .then((response) => response.json())
                .then((result) => {
                    Progress = result
                }).catch(() => {})

            await GetEpisodes(AnimeID)
                .then((response) => response.json())
                .then((result) => {
                    let to_sort = result;
                    let list = []
                    to_sort.sort((a, b) => {
                        if (a.EpisodeNr < b.EpisodeNr) {
                            return -1
                        } else if (a.EpisodeNr == b.EpisodeNr) {
                            return 0
                        } else {
                            return 1
                        }
                    })

                    let i = 0
                    for (let ep of to_sort) {
                        let color = "transparent"

                        if (Progress.length > 0) {
                            if (Progress[i] == 0) {
                                color = "transparent"
                            } else if (Progress[i] == 1) {
                                color = "#ffff0044"
                            } else if (Progress[i] == 2) {
                                color = "#00ff0044"
                            }
                        }

                        list.push((<a href={"/anime/" + props.AnimeID + "/ep/" + ep.EpisodeNr}><div class="EpBtn EpBtnRegular BtnHover"><h3 style={{ backgroundColor: color }}>{ep.EpisodeNr}</h3></div></a>))
                        i++
                    }
                    SetEps(list)
                })
        })()
    }, [])

    return (
        <div class="EpBtnContainer">
            {Eps}
        </div>
    )
}

export default EpisodeBtn;