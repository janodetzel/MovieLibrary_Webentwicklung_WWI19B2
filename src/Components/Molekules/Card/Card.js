import React, { useEffect } from "react";
import { useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import { getAllDetails } from '../../Utils/theMovieDB';

import AddCardButton from '../../Atoms/Button/AddCardButton'
import 'react-circular-progressbar/dist/styles.css';

import style from "./Card.module.css";

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
    title: "Fight Club",
    tagline: "Mischief. Mayhem. Soap.",
    date: "1999-10-15",
    adult: true,
    popularity: 37.717,
    voteAverage: 8.4,
    posterSrc: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    genres: ["Drama", "Action"]
  });


  useEffect(() => {


    const fetchDetails = async () => {
      const details = await getAllDetails(550)


      console.log(details)
      // setState({
      //   ...state,
      //   title: details.title,
      //   tagline: details.tagline,
      //   date: details.date,
      //   adult: details.adult,
      //   popularity: details.popularity,
      //   voteAverage: details.vote_average,
      //   posterSrc: "https://image.tmdb.org/t/p/w500/" + details.poster_path,
      //   // genres: details.genres
      // })

    }


    fetchDetails()

    // const details = async () => await getDetails(props.movieId)


  }, [])

  return (
    <>
      { state.new ?
        <EmptyCard onClick={props.onClick}></EmptyCard> : <article className={style.card}>
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
            <div className={style.vote}>
              <CircularProgressbar className={style.rating} value={state.voteAverage} text={`${state.voteAverage}%`} />
              <p>User Rating</p>
            </div>
          </content>
          <footer>
            <div className={style.genres}>{
              state.genres.map((item, key) => {
                return (<a key={key}>{item}</a>)
              })
            }</div>
            <p>{state.created.toDateString()}</p>
          </footer>
        </article>}

    </>




  );
};

export default Card;
