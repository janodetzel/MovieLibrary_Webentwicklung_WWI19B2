import React from "react";
import { FiFolderPlus } from "react-icons/fi";
import style from "./AddListButton.module.css";

const AddListButton = (props) => {

  return (
    <button className={style.button} onClick={props.onClick}>
      <FiFolderPlus className={style.icon} />
    </button>
  );
};

export default AddListButton;
