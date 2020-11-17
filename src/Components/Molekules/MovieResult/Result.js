import ReactReadMoreReadLess from "react-read-more-read-less";
import React from 'react'

import { posterSrcSm } from "../../Utils/theMovieDB"


import style from "./Result.module.css"


const Result = (props) => {
    return (
        <div className={style.result}>
            <div className={style.poster} onClick={props.onClick}>
                <img src={posterSrcSm + props.poster_path} alt="Poster" ></img>
            </div>
            <div className={style.titleBar} onClick={props.onClick}>
                <p className={style.title}>{props.title}</p>
                <p className={style.date}>{props.release_date}</p>
            </div>
            <div className={style.overview} >
                <ReactReadMoreReadLess
                    charLimit={80}
                    readMoreText={"Read more ▼"}
                    readLessText={"Read less ▲"}
                >
                    {props.overview}
                </ReactReadMoreReadLess>
            </div>
        </div>
    )
}


export default Result