import React, { useEffect } from "react";
import { useState } from "react";
import ReactLoading from 'react-loading';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import ReactReadMoreReadLess from "react-read-more-read-less";
import LoadingIndicator from '../../Atoms/Indicator/LoadingIndicator'
import uuid from 'react-uuid'


import Result from "../../Molekules/MovieResult/Result"
import { Modal } from "react-bootstrap"

import style from "./FindMovieModal.module.css";

const FindMovieModal = (props) => {


  const defaultInput = "Find a movie";
  const [input, setInput] = useState("")
  const [results, setResults] = useState([])

  useEffect(() => {
    const key = process.env.REACT_APP_MOVIE_DB_API
    const string = "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&language=en-US&" + "query=" + input + "&page=1&include_adult=false"

    if (input) {
      trackPromise(
        fetch(string)
          .then(res => res.json())
          .then(data => {
            try {
              var filtered = data.results.filter(res => res.poster_path != null && res.overview != "")
              setResults(filtered)
            } catch (error) {
              console.log(error)
            }
          })
      )
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
    setResults([])
  }

  const hanldeHide = () => {
    if (!input) reset()
    props.hide()
  }


  const renderResults = (results) => {
    if (results.length > 0) {
      return results.map(result => {
        return <Result key={uuid()} onClick={() => handleSubmit(result.id)} title={result.title} release_date={result.release_date} overview={result.overview} poster_path={result.poster_path} > </Result>
      })
    } else if (input) {
      return <p>Type in something else.</p>
    } else {
      return []
    }
  }

  const { promiseInProgress } = usePromiseTracker();

  return (
    <>
      <Modal className={style.modal} show={props.show} onHide={hanldeHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Body className={style.modalBody}>
          <div className={style.wrapper}>
            <form onSubmit={event => event.preventDefault()}>
              <input type="text" placeholder={defaultInput} value={input} onChange={(e) => setInput(e.target.value)} />
            </form>
            {console.log("RESULTS", results)}
            {promiseInProgress ? <LoadingIndicator /> : renderResults(results)}
          </div>
        </Modal.Body>
      </Modal >
    </>
  );
};

export default FindMovieModal;
