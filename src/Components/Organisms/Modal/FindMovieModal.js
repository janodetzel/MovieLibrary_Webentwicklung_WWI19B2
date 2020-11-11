import React, { useEffect } from "react";
import { useState } from "react";
import ReactLoading from 'react-loading';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import ReactReadMoreReadLess from "react-read-more-read-less";

import { FiNavigation } from "react-icons/fi";


import { Modal, InputGroup, FormControl, Button } from "react-bootstrap"
import { posterSrcDefault } from "../../Utils/theMovieDB"

import style from "./FindMovieModal.module.css";

const FindMovieModal = (props) => {


  const defaultInput = "Find a movie";
  const [input, setInput] = useState("")
  const [results, setResults] = useState([])

  useEffect(() => {
    const key = process.env.REACT_APP_MOVIE_DB_API
    const string = "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&language=en-US&" + "query=" + input + "&page=1&include_adult=false"


    console.log(string)

    if (input) {
      fetch(string)
        .then(res => res.json())
        .then(data => {
          try {
            var filtered = data.results.filter(res => res.poster_path != null && res.overview != "")
            console.log(filtered)
            setResults(filtered)
          } catch (error) {
            console.log(error)
          }
        })
    }
  }, [input])

  const handleSubmit = (id) => {

    if (id) {
      props.submit(id)
      props.hide()
      reset()
    } else {
      props.hide()
    }
  }


  const reset = () => {
    setInput("")
  }

  const hanldeHide = () => {
    reset()
    props.hide()
  }

  const Result = (props) => {
    return (
      <div className={style.result}>
        <div className={style.poster} onClick={props.onClick}>
          <img src={posterSrcDefault + props.poster_path} alt="Poster" ></img>
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


  return (
    <>

      <Modal className={style.modal} show={props.show} onHide={hanldeHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Body className={style.modalBody}>
          <div className={style.wrapper}>
            <form onSubmit={e => handleSubmit(e)}>
              <input type="text" placeholder={defaultInput} value={input} onChange={(e) => setInput(e.target.value)} />
            </form>
            {!results ? <ReactLoading className={style.loading} type={"bars"} color={"#ffffff"} height={'10%'} width={'10%'} /> :
              results.map((result, key) => {
                return <Result key={key} onClick={() => handleSubmit(result.id)} title={result.title} release_date={result.release_date} overview={result.overview} poster_path={result.poster_path} > </Result>
              })
            }
          </div>
        </Modal.Body>
      </Modal >
    </>
  );
};

export default FindMovieModal;