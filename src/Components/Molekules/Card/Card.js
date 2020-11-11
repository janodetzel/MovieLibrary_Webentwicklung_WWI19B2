import React, { useEffect } from "react";
import { useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import ReactReadMoreReadLess from "react-read-more-read-less";


import AddCardButton from '../../Atoms/Button/AddCardButton'

import 'react-circular-progressbar/dist/styles.css';

import style from "./Card.module.css";
import DeleteButton from "../../Atoms/Button/DeleteButton";

const EmptyCard = (props) => {
  return (
    <article className={`${style.card} ${style.empty}`}>
      <AddCardButton onClick={props.onClick}></AddCardButton>
    </article>
  );
};


const Card = (props) => {
  const [state, setState] = useState({
    new: props.new,
    created: new Date(),
    genres: ["Drama", "Action"],
    details: {
      title: "",
      tagline: "",
      release_date: "123",
      adult: false,
      popularity: 0,
      vote_average: 0,
      poster_path: "",
      genres: [],
      overview: "",
    }
  });




  useEffect(() => {
    const key = process.env.REACT_APP_MOVIE_DB_API
    const string = "https://api.themoviedb.org/3/movie/" + props.movieId + "?api_key=" + key
    if (!state.new) {
      fetch(string).then(
        res => res.json()
      ).then(
        (details) => {
          onSetResult(details)
        }
      )
    }
  }, [])

  const onSetResult = (details, key) => {
    setState(prevState => ({
      ...prevState,
      title: details.title,
      tagline: details.tagline,
      date: details.release_date,
      adult: details.adult,
      popularity: details.popularity,
      voteAverage: details.vote_average,
      overview: details.overview,
      genres: details.genres,
      posterSrc: "https://image.tmdb.org/t/p/w500/" + details.poster_path,
    }))
  }


  return (
    <>
      { state.new ?
        <EmptyCard onClick={props.onClick}></EmptyCard> : <article className={style.card}>
          <div className={style.deleteButton} onClick={() => props.deleteCard(props.movieId)}>
            <DeleteButton></DeleteButton>
          </div>
          <header className={style.cardHeader}>
            <div className={style.poster}>
              <img src={state.posterSrc} alt="Poster" ></img>
            </div>
          </header>
          <content>
            <div className={style.titleBar}>
              <h2 className={style.title}>{state.title}</h2>
              <p className={style.date}>{state.date}</p>
            </div>
            <p className={style.tagline}>{state.tagline}</p>
            <div className={style.overview}>
              {
                state.overview &&
                <ReactReadMoreReadLess
                  charLimit={80}
                  readMoreText={"Read more ▼"}
                  readLessText={"Read less ▲"}
                >
                  {state.overview}
                </ReactReadMoreReadLess>
              }
            </div>
            <div className={style.vote}>
              <CircularProgressbar className={style.rating} value={state.voteAverage} maxValue={10} text={`${state.voteAverage}`} />
              <p>User Rating</p>
            </div>
          </content>
          <footer>
            <div className={style.genres}>{
              state.genres.slice(0, 3).map((item, key) => {
                return (<a key={key}>{item.name}</a>)
              })
            }</div>
            <p>{state.created.toDateString()}</p>
          </footer>
        </article>}

    </>




  );
};

export default Card;
