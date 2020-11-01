import React from "react";
import { FiPlusCircle } from "react-icons/fi";

import style from "./AddCardButton.module.css";

const AddCardButton = (props) => {
  return (
    <button className={style.button} onClick={props.onClick}>
      <FiPlusCircle className={style.icon}></FiPlusCircle>
    </button>
  );
};

export default AddCardButton;
