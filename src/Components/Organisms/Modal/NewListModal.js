import React from "react";
import { useState } from "react";
import { FiNavigation } from "react-icons/fi";


import { Modal, InputGroup, FormControl, Button } from "react-bootstrap"
import style from "./NewListModal.module.css";

const NewListModal = (props) => {

  const defaultInput = "What's my name?";
  const [input, setInput] = useState("")


  const handleSubmit = (event) => {
    if (input) {
      props.submit(input)
      props.hide()
      reset()
    } else {
      props.hide()
    }
    event.preventDefault();
  }


  const reset = () => {
    setInput("")
  }

  const hanldeHide = () => {
    reset()
    props.hide()
  }

  return (
    <Modal className={style.modal} show={props.show} onHide={hanldeHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Body className={style.modalBody}>
        <div className={style.wrapper}>
          <form onSubmit={e => handleSubmit(e)}>
            <input type="text" placeholder={defaultInput} value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit" className={style.button}><FiNavigation className={style.icon}></FiNavigation></button>
          </form>
        </div>
      </Modal.Body>
    </Modal >
  );
};

export default NewListModal;
